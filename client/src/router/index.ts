import { createRouter, createWebHistory } from "vue-router";
import RegistrationPage from "@/views/RegistrationPage/RegistrationPage.vue";
import LoginPage from "@/views/LoginPage/LoginPage.vue";
import ProfilePage from "@/views/ProfilePage/ProfilePage.vue";
import FindPeoplesPage from "@/views/FindPeoplesPage/FindPeoplesPage.vue";
import UserPage from '@/views/UserPage/UserPage.vue'
import RootPage from '@/views/RootPage/RootPage.vue'
import App from '@/App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: RootPage,
    },
    {
      path: "/:id",
      name: "userPage",
      component: UserPage,
    },
    {
      path: "/registration",
      name: "registration",
      component: RegistrationPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
    },
    {
      path: "/find-peoples",
      name: "find-peoples",
      component: FindPeoplesPage,
    },
  ],
});

export default router;
