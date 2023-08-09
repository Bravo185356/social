const UserRepository = require("../repositories/userRepository");

class UserController {
  async setLastVisitTime(req) {
    const { id } = req.body;
    const date = new Date().toISOString();
    await UserRepository.setLastVisitTime(date, id);
  }
  async deleteUser(req) {
    const { id } = req.body;
    await UserRepository.deleteUser(id)
  }
}

module.exports = new UserController();
