import axios from "axios";

export default class UserApi {
  static async getUserInfo(id: number, myId: number) {
    const response = await axios.get(`http://localhost:8080/api/search/user`, {
      params: {
        id,
        myId
      }
    });
    return response.data
  }
}