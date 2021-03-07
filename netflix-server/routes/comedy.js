

const express = require('express');
const router = express.Router();

const comedy_controllers = require("../controllers/comedy_controller")


router.get('/getComedy',comedy_controllers.getComedy);

router.get('/updateComedy',comedy_controllers.updateComedy);

module.exports = router;