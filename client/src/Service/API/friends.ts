import axios from "axios";

export default class FriendApi {
  static async getFriends(id: number) {
    const response = await axios.get(`http://localhost:8080/api/friends/${id}`);
    return response.data;
  }
  static async getFriendsWithFilter(id: number, query: any) {
    const friendList = await axios.get("http://localhost:8080/api/friends/filtered", {
      params: {
        id,
        ...query,
      },
    });
    return friendList.data;
  }
  static async addFriend(myId: number, id: number) {
    await axios.post("http://localhost:8080/api/friends/add", {
      myId: myId,
      id: id,
    });
  }
}
