const FriendsRepository = require("../repositories/friendsRepository");

class FriendsController {
  async addFriend(req, res) {
    const { myId, id } = req.body;
    await FriendsRepository.addFriend(myId, id);
  }
  async getFriendList(req, res) {
    const id = req.query.id;
    const friendList = await FriendsRepository.getFriendList(id);
    res.json(friendList);
  }
  async getFriendsWithFilter(req, res) {
    const { id, name, surname = null } = req.query;
    const filteredList = await FriendsRepository.getFriendsWithFilter(id, name, surname);
    res.json(filteredList);
  }
}

module.exports = new FriendsController();
