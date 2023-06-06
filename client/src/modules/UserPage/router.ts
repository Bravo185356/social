import UserApi from "@/Service/API/users";
import Module from "./Module.vue";
import UserPage from "./views/UserPage.vue";
import FriendApi from "@/Service/API/friends";
import PostsApi from "./API/posts";

export async function fetchUserInfo(id: number) {
    const info = await UserApi.getUserInfo(id);
    const friendList = await FriendApi.getMyFriends(id);
    const postsList = await PostsApi.getUserPosts(id);
    return [info, friendList, postsList]
}

const moduleRoute = {
  path: "/:id",
  component: Module,
  children: [
    {
      path: "",
      component: UserPage,
      props: true,
      beforeEnter: async (to: any) => {
        const [userInfo, friendList, postsList] = await fetchUserInfo(to.params.id)
        to.params.user = userInfo;
        to.params.friends = friendList;
        to.params.posts = postsList
      },
    },
  ],
};

export default moduleRoute;
