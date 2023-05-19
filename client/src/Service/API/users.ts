export default class UserApi {
  static async getAllUsers() {
    const response = await fetch("http://localhost:8080/api/search");
    const userList = await response.json();
    return userList
  }
  static async getUserInfo(id: number) {
    const response = await fetch(`http://localhost:8080/api/get-user?id=${id}`);
    const info = await response.json();
    return info
  }
}
