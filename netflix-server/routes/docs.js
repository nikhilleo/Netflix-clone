

const express = require('express');
const router = express.Router();

const docs_controller = require("../controllers/docs_controller")


router.get('/getDocs',docs_controller.getDocs)

router.get('/updateDocs',docs_controller.updateDocs);

module.exports = router;