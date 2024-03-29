const Router = require("express");
const router = new Router();
const multer = require("multer");
const AvatarController = require("../controller/avatar.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname );
  },
});
const upload = multer({ storage: storage });

router.post("/avatar/change", upload.single("avatar"), AvatarController.uploadAvatar);
router.get('/avatars/recent/:userId', AvatarController.getRecentAvatars)
router.post('/avatar/select', AvatarController.selectFromRecent)

module.exports = router;
