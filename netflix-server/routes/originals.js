

const express = require('express');
const router = express.Router();

const original_controllers = require("../controllers/originals_controller")


router.get('/getOriginals',original_controllers.getOriginals);

router.get('/updateOriginals',original_controllers.updateOriginals);

module.exports = router;