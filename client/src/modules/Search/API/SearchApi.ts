import axios from 'axios'

export default class SearchApi {
  static async getAllUsers() {
    const userList = await axios.get(`http://localhost:8080/api/search`)
    return userList.data;
  }
  static async getUsersWithFilter(query = null) {
    const userList = await axios.get(`http://localhost:8080/api/search/filtered-users`, {
      params: query
    })
    return userList.data;
  }
}
