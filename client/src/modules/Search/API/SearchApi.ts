import axios from 'axios'

export default class SearchApi {
  static async getAllUsers() {
    const userList = await axios.get(`http://localhost:8080/api/search`)
    return userList.data;
  }
  static async getUsersWithFilter(filters: any) {
    console.log(filters)
    const userList = await axios.get(`http://localhost:8080/api/search/filtered-users`, {
      params: { filters }
    })
    return userList.data;
  }
}
