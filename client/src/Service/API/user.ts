import axios from "axios";

export default class UserApi {
  static async setLastVisitTime(id: number) {
    await axios.post('http://localhost:8080/api/user/last-visit', {
      id
    })
  }
  static async deleteUser(id: number) {
    await axios.post('http://localhost:8080/api/user/delete', {
      id
    })
  }
}
