import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue";

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
        component: () => import("../pages/createPost.vue")
        // meta: { requiredLogin: true }
      },
      {
        path: "/posts/:id",
        name: "post",
        component: () => import("../pages/postDetail.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/register.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default router;
