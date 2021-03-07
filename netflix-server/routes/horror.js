

const express = require('express');
const router = express.Router();

const horror_controllers = require("../controllers/horror_controllers")


router.get('/getHorror',horror_controllers.getHorror);

router.get('/updateHorror',horror_controllers.updateHorror);

module.exports = router;