import axios from "axios";

export default class FriendApi {
  static async getMyFriends(id: number) {
    const response = await axios.get(`http://localhost:8080/api/get-friends`, {
      params: {
        id,
      },
    });
    return response.data;
  }
  static async getFriendsWithFilter(id: number, query: any) {
    const friendList = await axios.get("http://localhost:8080/api/get-filtered-friends", {
      params: {
        id,
        ...query,
      },
    });
    return friendList.data;
  }
  static async addFriend(myId: number, id: number) {
    await axios.post("http://localhost:8080/api/add-friend", {
      myId: myId,
      id: id,
    });
  }
}
