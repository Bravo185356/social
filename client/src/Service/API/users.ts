export default class UserApi {
  static async getAllUsers() {
    const response = await fetch("http://localhost:8080/api/search");
    const userList = await response.json();
    return userList
  }
  static async getUserInfo(id: number, myId: number) {
    const response = await fetch(`http://localhost:8080/api/get-user?id=${id}&myId=${myId}`);
    const info = await response.json();
    console.log(info)
    return info
  }
}
