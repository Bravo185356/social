import { createRouter, createWebHistory } from "vue-router";
import ProfilePage from "@/views/ProfilePage.vue";
import RootPage from "@/views/RootPage.vue";
import AuthRoutes from "@/modules/Auth/index";
import SearchRoutes from "@/modules/Search/index";
import UserRoutes from "@/modules/UserPage/index";
import { useUserStore } from "@/stores/user";
import { useIsLoading } from "@/stores/isLoading";
import AuthApi from "@/Service/API/auth";
import FriendApi from "@/Service/API/friends";
import FriendsPage from "@/views/FriendsPage.vue";

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
    {
      path: '/friends',
      name: 'friends',
      component: FriendsPage,
      props: true,
      beforeEnter: async (to) => {
        const userStore = useUserStore();
        const friendList = await FriendApi.getMyFriends(userStore.getUser.id)
        to.params.friends = friendList
      }
    }
  ],
});
router.addRoute(AuthRoutes);
router.addRoute(SearchRoutes);
router.addRoute(UserRoutes);

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  const isLoadingStore = useIsLoading();

  const token = localStorage.getItem('token')
  if(token && !userStore.isLogined) {
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
