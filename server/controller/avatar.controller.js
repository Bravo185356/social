const AvatarRepository = require('../repositories/avatarRepository')

class AvatarController {
  async uploadAvatar(req, res) {
    const { id } = req.body;
    const file = req.file.filename;
    const date = new Date().toISOString();

    await AvatarRepository.addAvatarToRecentList(id, date)
    const img = await AvatarRepository.updateAvatar(file, id);
    const newRecentAvatarsList = await AvatarRepository.getRecentList(id)
    res.json({ img, recent: newRecentAvatarsList });
  }
  async getRecentAvatars(req, res) {
    const { userId } = req.params;
    const recentAvatars = await AvatarRepository.getRecentList(userId);
    res.json(recentAvatars);
  }
  async selectFromRecent(req, res) {
    const { id, img } = req.body;
    const image = await AvatarRepository.updateAvatar(img, id);
    res.json(image);
  }
}

module.exports = new AvatarController();
