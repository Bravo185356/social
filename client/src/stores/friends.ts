import { ref, computed } from "vue";
import type { Ref } from 'vue'
import { defineStore} from "pinia";

type User = {
  
}

export const useFriendStore = defineStore("friends", () => {
  const friends: Ref<User[]> = ref([]);

  function setFriends(friendList: any) {
    friends.value = friendList;
  }
  function $reset() {
    friends.value = []
  }
  function addUserToFriendList(user: any) {
    friends.value = [...friends.value, user]
  }
  const getFriendList = computed(() => friends.value);

  return { getFriendList, friends, setFriends, addUserToFriendList, $reset };
});
