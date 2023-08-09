const RequestsRepository = require('../repositories/requestsRepository')

class RequestController {
  async getFriendRequests(req, res) {
    const id = req.query.id;
    const users = await RequestsRepository.getFriendRequests(id)
    res.json(users);
  }
  async acceptRequest(req, res) {
    const { myId, id } = req.body;
    await RequestsRepository.acceptRequest(myId, id)
  }
  async rejectRequest(req, res) {
    const { id } = req.body;
    await RequestsRepository.rejectRequest(id);
  }
}

module.exports = new RequestController();
