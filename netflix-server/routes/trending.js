

const express = require('express');
const router = express.Router();
const trending_controllers = require("../controllers/trending_controllers")


router.get('/getTrending',trending_controllers.getTrending);

router.get('/updateTrending',trending_controllers.updateTrending);

module.exports = router;