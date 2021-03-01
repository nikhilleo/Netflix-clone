

const express = require('express');
const router = express.Router();
const trending_controllers = require("../controllers/trending_controllers")


router.get('/getTrending',trending_controllers.getTrending);


module.exports = router;