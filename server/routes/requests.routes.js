const Router = require("express");
const router = new Router();
const RequestController = require('../controller/requests.controller')

router.get('/get-requests', RequestController.getFriendRequests)
router.post('/accept-request', RequestController.acceptRequest)
router.delete('/reject-request', RequestController.rejectRequest)

module.exports = router