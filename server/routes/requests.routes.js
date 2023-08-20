const Router = require("express");
const router = new Router();
const RequestController = require('../controller/requests.controller')

router.get('/requests/:userId', RequestController.getFriendRequests)
router.post('/request/accept', RequestController.acceptRequest)
router.delete('/request/reject', RequestController.rejectRequest)

module.exports = router