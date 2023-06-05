import { createRouter, createWebHistory } from "vue-router";
import ProfilePage from "@/views/ProfilePage/ProfilePage.vue";
import RootPage from "@/views/RootPage.vue";
import AuthRoutes from "@/modules/Auth/index";
import SearchRoutes from "@/modules/Search/index";
import UserRoutes from "@/modules/UserPage/index";
import { useUserStore } from "@/stores/user";
import { useIsLoading } from "@/stores/isLoading";
import AuthApi from "@/Service/API/auth";

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
        isLoadingStore.setIsLoading(true);
        if(!userStore.isLogined) {
          return '/auth/login'
        } else {
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
  const userStore = useUserStore();
  const isLoadingStore = useIsLoading();

  const token = localStorage.getItem('token')
  if(token && !userStore.isLogined) {
    console.log('auth')
    const user = await AuthApi.loginOnPageLoad(token!);
    await userStore.setUser(user.rows[0]);
  }
  isLoadingStore.setIsLoading(true);
});
router.afterEach(() => {
  const isLoadingStore = useIsLoading();
  isLoadingStore.setIsLoading(false);
})
export default router;
