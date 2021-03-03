

const express = require('express');
const router = express.Router();
const topRated_controllers = require("../controllers/topRated_controllers")


router.get('/getTopRated',topRated_controllers.getTopRated);

router.get('/updateTopRated',topRated_controllers.updateTopRated);

module.exports = router;