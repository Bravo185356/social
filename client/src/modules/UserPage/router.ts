import UserApi from "@/Service/API/users";
import Module from "./Module.vue";
import UserPage from "./views/UserPage.vue";
import FriendApi from "@/Service/API/friends";

export async function fetchUserInfo(id: number) {
    const info = await UserApi.getUserInfo(id);
    const friendList = await FriendApi.getMyFriends(id);
    return [info, friendList]
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
        const [userInfo, friendList] = await fetchUserInfo(to.params.id)
        to.params.user = userInfo;
        to.params.friends = friendList;
      },
    },
  ],
};

export default moduleRoute;
