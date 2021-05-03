const router = require("express").Router();
const authController = require("../controllers/authController")

// Registration
router.post('/register', authController.registrationController);

// Login
router.post('/login',authController.loginController);

// To check the get request
router.get('/',(req,res) => {
    res.send('blankk')
})

module.exports = router;