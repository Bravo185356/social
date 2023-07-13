import UserApi from "./API/user";
import Module from "./Module.vue";
import UserPage from "./views/UserPage.vue";
import FriendApi from "@/Service/API/friends";
import PostsApi from "./API/posts";
import { useUserStore } from "@/stores/user";

const moduleRoute = {
  path: "/:id",
  component: Module,
  children: [
    {
      path: "",
      component: UserPage,
      props: true,
      beforeEnter: async (to: any) => {
        const userStore = useUserStore();

        const userInfo = await UserApi.getUserInfo(to.params.id, userStore.getUser.id);
        const friendList = await FriendApi.getFriends(to.params.id);
        const postsList = await PostsApi.getUserPosts(to.params.id);

        to.params.user = userInfo;
        to.params.friends = friendList;
        to.params.posts = postsList;
      },
    },
  ],
};

export default moduleRoute;
