

const express = require('express');
const router = express.Router();

const romance_controller = require("../controllers/romance_controller")


router.get('/getRomance',romance_controller.getRomance)

router.get('/updateRomance',romance_controller.updateRomance);

module.exports = router;