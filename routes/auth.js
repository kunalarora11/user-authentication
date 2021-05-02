const router = require("express").Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registration
router.post('/register', async (req,res) => {
    // res.send("register");

    // Validation of data before creating a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if the user is already in the db
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send("Email already exists");

    const usernameExists = await User.findOne({username: req.body.username});
    if(usernameExists) return res.status(400).send("Username already exists");

    // Hashing password
    const salt = await  bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send(`User ${savedUser.username} is saved`);
    }catch(err){
        res.status(500).send(err);
    }
});

// Login
router.post('/login', async (req,res) => {
    // res.send("login");

    // Validation of data before logging in a user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if the user exists in the db
    // const emailExists = await User.findOne({email: req.body.email});
    // const user = emailExists;
    // if(!emailExists) return res.status(400).send("Email doesn't exists");

    const usernameExists = await User.findOne({username: req.body.username});
    const user = usernameExists;
    if(!usernameExists) return res.status(400).send("Username doesn't exists");

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid Password");

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    // res.send("Login");

});

// To check the get request
router.get('/',(req,res) => {
    res.send('blankk')
})

module.exports = router;