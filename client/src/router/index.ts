import { createRouter, createWebHistory } from "vue-router";
import ProfilePage from "@/views/ProfilePage/ProfilePage.vue";
import UserPage from '@/modules/UserPage/views/UserPage.vue'
import RootPage from '@/views/RootPage/RootPage.vue'
import AuthRoutes from '@/modules/Auth/index'
import SearchRoutes from '@/modules/Search/index'
import UserRoutes from '@/modules/UserPage/index'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: RootPage,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
    }
  ],
});
router.addRoute(AuthRoutes)
router.addRoute(SearchRoutes)
router.addRoute(UserRoutes)

export default router;
