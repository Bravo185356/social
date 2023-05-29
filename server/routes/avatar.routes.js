const Router = require("express");
const router = new Router();
const multer = require("multer");
const AvatarController = require("../controller/avatar.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/change-avatar", upload.single("avatar"), AvatarController.changeAvatar);

module.exports = router;
