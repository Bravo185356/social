import axios from "axios";

export default class UserApi {
  static async getAllUsers() {
    const response = await axios.get("http://localhost:8080/api/search");
    return response.data
  }
  static async getUserInfo(id: number, myId: number) {
    const response = await axios.get(`http://localhost:8080/api/get-user`, {
      params: {
        id,
        myId
      }
    });
    return response.data
  }
  static async setLastVisitTime(id: number) {
    await axios.post('http://localhost:8080/api/set-last-visit', {
      id: id
    })
  }
}
