import ChatPage from "./views/ChatPage.vue";
import Module from "./Module.vue";
import DialogPage from "./views/DialogPage.vue";

const moduleRoute = {
  path: "/messager",
  component: Module,
  children: [
    {
      path: "",
      name: "chat",
      component: ChatPage,
    },
    { 
        path: ":id/:chatId", 
        name: 'dialog',
        component: DialogPage
    },
  ],
};

export default moduleRoute;
