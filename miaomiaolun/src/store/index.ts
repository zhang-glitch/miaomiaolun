import { createStore } from "vuex";
import { columnList, postList } from "../testData";
import axios from "axios";
import { reactive } from "vue";

export interface UserProps {
  id?: number;
  isLogin: boolean;
  name?: string;
  columnId?: number;
}

interface AvatarProps {
  _id?: string;
  url?: string;
}

interface PageSizeProps {
  page: string;
  size: string;
}

export interface ColumnProps {
  id: number;
  title: string;
  avatar: AvatarProps;
  description: string;
}

export interface PostProps {
  id?: number;
  title: string;
  content?: string;
  image?: string;
  // 时间
  createdAt?: string;
  columnId: number;
}

export interface StateProps {
  user: UserProps;
  columnList: ColumnProps[];
  postList: PostProps[];
  columnListCount: number;
}

const state: StateProps = {
  user: {
    id: 1,
    isLogin: true,
    name: "zhanghao",
    columnId: 1
  },
  columnList: columnList,
  postList: postList,
  columnListCount: 0
};

const getters = {
  getColumnById(state: StateProps) {
    return (id: number) => {
      return state.columnList.find(item => item.id === id);
    };
  },
  getPostListById(state: StateProps) {
    return (id: number) => {
      return state.postList.filter(item => item.columnId === id);
    };
  }
};

const mutations = {
  // 新建文章
  addPost(state: StateProps, post: PostProps) {
    state.postList.push(post);
  },
  // 获取文章column列表
  getColumnList(state: StateProps, columns: ColumnProps[]) {
    state.columnList = columns;
  }
};

const actions = {
  getColumnList(
    context: {
      commit: (arg0: string, arg1: ColumnProps[]) => void;
    },
    PageSize: PageSizeProps
  ) {
    axios
      .get(`/columns?currentPage=${PageSize.page}&pageSize=${PageSize.size}`)
      .then(res => {
        // console.log("res", res);
        context.commit("getColumnList", res.data.list);
        state.columnListCount = res.data.count;
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
