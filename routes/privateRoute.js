const router = require("express").Router();
const verify = require("./verify");
const privateController = require('../controllers/privateController')

// Private route for verified users
router.get('/', verify, privateController)

module.exports = router;