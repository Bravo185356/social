export default class FriendApi {
  static async getMyFriends(id: number) {
    const response = await fetch(`http://localhost:8080/api/get-friends?id=${id}`);
    const friendList = await response.json();
    return friendList.rows
  }
  static async addFriend() {
    
  }
}
