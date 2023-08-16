import ChatPage from "./views/ChatPage.vue";
import Module from "./Module.vue";
import ChatApi from "./API/chat";
import FriendApi from "@/Service/API/friends";
import { useUserStore } from "@/stores/user";

const moduleRoute = {
  path: "/messager",
  component: Module,
  children: [
    {
      path: "",
      name: "chat",
      component: ChatPage,
      props: true,
      beforeEnter: async (to: any) => {
        const userStore = useUserStore();

        const chats = await ChatApi.getAllChats(userStore.getUser.id);
        to.params.chats = chats;

        const friends = await FriendApi.getFriends(userStore.getUser.id);
        to.params.friends = friends;
      },
    },
  ],
};

export default moduleRoute;
