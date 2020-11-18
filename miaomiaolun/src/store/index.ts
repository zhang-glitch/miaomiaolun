import { createStore, ActionContext } from "vuex";
import { columnList, postList, column } from "../testData";
import axios from "axios";
import { reactive } from "vue";

export interface UserProps {
  id?: number;
  isLogin: boolean;
  name?: string;
  columnId?: string;
}

interface AvatarProps {
  _id?: string;
  url?: string;
}

interface PageSizeProps {
  page: string;
  size: string;
  // 这个id表示的是专栏的id
  id?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar: AvatarProps;
  description: string;
}

export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  image?: AvatarProps;
  // 时间
  createdAt?: string;
  column: string;
}

export interface StateProps {
  user: UserProps;
  columnList: ColumnProps[];
  postList: PostProps[];
  columnListCount: number;
  postListCount: number;
  column: ColumnProps;
  loading: boolean;
}

const state: StateProps = {
  user: {
    id: 1,
    isLogin: true,
    name: "zhanghao",
    columnId: "1"
  },
  columnList,
  column,
  postList,
  columnListCount: 0,
  postListCount: 0,
  loading: false
};

const getters = {
  getColumnById(state: StateProps) {
    return (id: string) => {
      return state.columnList.find(item => item._id === id);
    };
  },
  getPostListById(state: StateProps) {
    return (id: string) => {
      return state.postList.filter(item => item.column === id);
    };
  }
};

const mutations = {
  // 新建文章
  addPost(state: StateProps, post: PostProps) {
    state.postList.push(post);
  },
  // 获取专栏column列表
  getColumnList(state: StateProps, columns: ColumnProps[]) {
    state.columnList = columns;
  },
  //获取单个专栏
  getColumn(state: StateProps, column: ColumnProps) {
    state.column = column;
  },
  // 获取post列表
  getPostList(state: StateProps, posts: PostProps[]) {
    state.postList = posts;
  },
  // 设置loading
  setLoading(state: StateProps, bool: boolean) {
    state.loading = bool;
  }
};

const actions = {
  // 获取专栏列表
  getColumnList(
    context: ActionContext<StateProps, StateProps>,
    PageSize: PageSizeProps
  ) {
    // context.state.loading = true;
    axios
      .get(`/columns?currentPage=${PageSize.page}&pageSize=${PageSize.size}`)
      .then(res => {
        // console.log("res", res);
        // context.state.loading = false;
        context.commit("getColumnList", res.data.list);
        state.columnListCount = res.data.count;
      });
  },

  //根据专栏id获取单个专栏,即获取专栏详情
  getColumn(context: ActionContext<StateProps, StateProps>, id: string) {
    // context.state.loading = true;
    axios.get(`/columns/${id}`).then(res => {
      // console.log(res);
      // context.state.loading = false;
      context.commit("getColumn", res.data);
    });
  },

  //获取专栏文章列表
  getPostList(
    context: ActionContext<StateProps, StateProps>,
    PageSize: PageSizeProps
  ) {
    // console.log(PageSize);
    // context.state.loading = true;
    axios
      .get(
        `/columns/${PageSize.id}/posts?currentPage=${PageSize.page}&pageSize=${PageSize.size}`
      )
      .then(res => {
        // console.log(res);
        // // 设置loading为false
        // context.state.loading = false;
        context.commit("getPostList", res.data.list);
        state.postListCount = res.data.count;
      });
  }
};
const store = createStore({
  state,
  getters,
  mutations,
  actions
});

export default store;
