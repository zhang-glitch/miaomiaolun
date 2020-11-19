import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue";
import { useStore } from "vuex";
import { StateProps } from "../store";
const store = useStore<StateProps>();
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "index",
        component: () => import("../pages/index.vue")
      },
      {
        path: "/column/:id",
        name: "column",
        component: () => import("../pages/columnDetail.vue")
      },
      {
        path: "/create",
        name: "create",
        component: () => import("../pages/createPost.vue"),
        meta: { requiredLogin: true }
      },
      {
        path: "/posts/:id",
        name: "post",
        component: () => import("../pages/postDetail.vue")
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../pages/login.vue"),
        meta: { redirectIndex: true }
      },
      {
        path: "/register",
        name: "register",
        component: () => import("../pages/register.vue")
      },
      {
        path: "/edit",
        name: "edit",
        component: () => import("../pages/edit.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

// router.beforeEach((to, from, next) => {
//   // 判断是否未登录就访问了create
//   const { isLogin } = store.state.user;
//   if (isLogin) {
//     if (to.meta.requiredLogin && !isLogin) {
//       next({ name: "login" });
//     } else if (to.meta.redirectIndex && isLogin) {
//       next("/");
//     } else {
//       next();
//     }
//   }
// });

export default router;
