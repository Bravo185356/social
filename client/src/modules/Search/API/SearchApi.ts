export default class SearchApi {
  static async getAllUsers() {
    const response = await fetch("http://localhost:8080/api/search");
    const userList = await response.json();
    return userList;
  }
}
