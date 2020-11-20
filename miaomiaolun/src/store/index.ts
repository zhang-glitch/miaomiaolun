import { createStore, ActionContext } from "vuex";
import { columnList, postList, column } from "../testData";
import axios from "axios";
import { reactive } from "vue";

export interface UserProps {
  _id?: string;
  isLogin: boolean;
  nickName?: string;
  column?: string;
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
  token: string;
  error: ErrorProps;
  postDetail: PostDetailProps;
}

// 登录的账号和密码
export interface EmailPasswordProps {
  email: string;
  password: string;
}

export interface ErrorProps {
  isError: boolean;
  message?: string;
}

export interface AuthorProps {
  avatar?: AvatarProps;
  description?: string;
  nickName?: string;
  _id?: string;
  email?: string;
}

export interface PostDetailProps {
  _id?: string;
  author?: AuthorProps;
  column?: string;
  content?: string;
  createdAt?: string;
  excerpt?: string;
  image?: AvatarProps;
  isHTML?: boolean;
  title?: string;
}

const state: StateProps = {
  user: {
    _id: "",
    isLogin: false,
    nickName: "",
    column: ""
  },
  columnList,
  column,
  postList,
  columnListCount: 0,
  postListCount: 0,
  loading: false,
  token: localStorage.getItem("token") || "",
  error: { isError: false },
  postDetail: {}
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
  },
  // 判断登录
  getLogin(state: StateProps, token: string) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  //获取当前用户
  getUser(state: StateProps, userVal: any) {
    state.user = { isLogin: true, ...userVal };
  },
  //退出登录
  logout(state: StateProps) {
    state.token = "";
    state.user = { isLogin: false };
    localStorage.remove("token");
    delete axios.defaults.headers.common.Authorization;
  },
  //错误提示
  handleErr(state: StateProps, err: ErrorProps) {
    state.error = err;
  },
  // 获取文章详情页信息
  getPostDetail(state: StateProps, val: any) {
    state.postDetail = val;
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
  },

  //获取登录后的token
  async getLogin(
    context: ActionContext<StateProps, StateProps>,
    emailPassword: EmailPasswordProps
  ) {
    const { data } = await axios.post("/user/login", emailPassword);
    // console.log(data);
    context.commit("getLogin", data.token);
  },

  //获取用户信息
  async getUser(context: ActionContext<StateProps, StateProps>) {
    const { data } = await axios.get("/user/current");
    // console.log(data);
    context.commit("getUser", data);
  },

  // //退出登录
  // logout(context: ActionContext<StateProps, StateProps>) {
  //   context.commit("logout");
  // },

  // 获取文章详情
  async getPostDetail(
    context: ActionContext<StateProps, StateProps>,
    id: string
  ) {
    const { data } = await axios.get(`/posts/${id}`);
    // console.log(data);
    context.commit("getPostDetail", data);
  }
};
const store = createStore({
  state,
  getters,
  mutations,
  actions
});

export default store;
