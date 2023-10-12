import { createRouter, createWebHistory } from "vue-router";
import RootPage from "@/views/RootPage.vue";
import { AuthRoutes, SearchRoutes, UserPageRoutes, ProfileRoutes, ChatRoutes } from "@/modules/index";
import { useUserStore } from "@/stores/user";
import { useIsLoading } from "@/stores/isLoading";
import AuthApi from "@/Service/API/auth";
import FriendApi from "@/Service/API/friends";
import FriendsPage from "@/views/FriendsPage.vue";
import connectToWebsockets from "@/helpers/connectToWebsockets";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: RootPage,
      beforeEnter: async () => {
        const userStore = useUserStore();
        if (userStore.isLogined) {
          return `/${userStore.getUser.id}`;
        }
      },
    },
    {
      path: "/friends",
      name: "friends",
      component: FriendsPage,
      props: true,
      beforeEnter: async (to) => {
        const userStore = useUserStore();
        const friendList = await FriendApi.getFriends(userStore.getUser.id);
        to.params.friends = friendList;
      },
    },
  ],
});
router.addRoute(AuthRoutes);
router.addRoute(SearchRoutes);
router.addRoute(UserPageRoutes);
router.addRoute(ProfileRoutes);
router.addRoute(ChatRoutes);

router.beforeEach(async () => {
  const userStore = useUserStore();
  const isLoadingStore = useIsLoading();

  const token = localStorage.getItem("token");
  if (token && !userStore.isLogined) {
    const data = await AuthApi.loginOnPageLoad(token!);
    if (data.error) {
      localStorage.removeItem("token");
      return "auth/login";
    }
    connectToWebsockets();
    userStore.setUser(data.user);
    localStorage.setItem("token", data.newToken);
  }
  isLoadingStore.setIsLoading(true);
});
router.afterEach(() => {
  const isLoadingStore = useIsLoading();
  isLoadingStore.setIsLoading(false);
});
export default router;
