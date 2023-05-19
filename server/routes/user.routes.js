const Router = require('express')
const router = new Router()
const UserController = require('../controller/user.controller')
const PostController = require('../controller/post.controller')
const AuthController = require('../controller/auth.controller')
const AvatarController = require('../controller/avatar.controller')
const FriendsController = require('../controller/friends.contorller')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

router.post('/create', AuthController.createUser)
router.post('/login', AuthController.login)

router.get('/search', UserController.getAllUsers)
router.get('/get-user', UserController.getUserInfo)

router.delete('/delete-post', PostController.deletePost)
router.post('/create-post', PostController.createPost)
router.get('/get-posts', PostController.getUserPosts)

router.post('/change-avatar', upload.single('avatar'), AvatarController.changeAvatar)

router.post('/add-friend', FriendsController.addFriend)
router.get('/get-friends', FriendsController.getFriendList)

module.exports = router