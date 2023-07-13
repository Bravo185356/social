import axios from "axios";

export default class UserApi {
  static async setLastVisitTime(id: number) {
    await axios.post('http://localhost:8080/api/set-last-visit', {
      id
    })
  }
  static async deleteUser(id: number) {
    await axios.post('http://localhost:8080/api/delete-user', {
      id
    })
  }
}
