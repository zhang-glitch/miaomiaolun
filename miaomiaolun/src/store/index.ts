import { createStore } from "vuex";
import { columnList, postList } from "../testData";

export interface UserProps {
  id?: number;
  isLogin: boolean;
  name?: string;
  columnId?: number;
}

export interface ColumnProps {
  id: number;
  title: string;
  avatar: string;
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
}

const state: StateProps = {
  user: {
    id: 1,
    isLogin: true,
    name: "zhanghao",
    columnId: 1
  },
  columnList: columnList,
  postList: postList
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
  addPost(state: StateProps, post: PostProps) {
    state.postList.push(post);
  }
};
const store = createStore({
  state,
  getters,
  mutations
});

export default store;
