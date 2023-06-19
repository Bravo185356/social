import axios from 'axios'

export default class SearchApi {
  static async getAllUsers(query = null) {
    const userList = await axios.get(`http://localhost:8080/api/search`, {
      params: query
    })
    return userList.data;
  }
}
