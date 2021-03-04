

const express = require('express');
const router = express.Router();

const action_controllers = require("../controllers/actoin_controllers")


router.get('/getAction',action_controllers.getAction);

router.get('/updateAction',action_controllers.updateAction);

module.exports = router;