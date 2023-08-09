const SearchRepository = require('../repositories/searchRepository')

class SearchController {
  async getAllUsers(req, res) {
    const userList = await SearchRepository.getAllUsers();
    res.json(userList);
  }
  async getUsersWithFilter(req, res) {
    const { name, surname = null } = req.query;
    const userList = await SearchRepository.getUsersWithFilter(name, surname)
    res.json(userList);
  }
  async getUserInfo(req, res) {
    const { id, myId } = req.query;
    const userInfo = await SearchRepository.getUserInfo(id, myId)
    res.json(userInfo);
  }
}

module.exports = new SearchController();
