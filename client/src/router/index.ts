import { createRouter, createWebHistory } from "vue-router";
import ProfilePage from "@/views/ProfilePage/ProfilePage.vue";
import RootPage from "@/views/RootPage.vue";
import AuthRoutes from "@/modules/Auth/index";
import SearchRoutes from "@/modules/Search/index";
import UserRoutes from "@/modules/UserPage/index";
import { useUserStore } from "@/stores/user";
import { useIsLoading } from "@/stores/isLoading";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: RootPage,
      beforeEnter: async (to, from) => {
        console.log("redirect");
        const userStore = useUserStore();
        const isLoadingStore = useIsLoading();
        if (userStore.isLogined) {
          isLoadingStore.setIsLoading(true);
          return `/${userStore.getUser.id}`;
        }
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
    },
  ],
});
router.addRoute(AuthRoutes);
router.addRoute(SearchRoutes);
router.addRoute(UserRoutes);

router.beforeEach(async () => {
  const isLoadingStore = useIsLoading();
  isLoadingStore.setIsLoading(false);
});
export default router;
