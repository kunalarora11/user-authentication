const router = require("express").Router();
const verify = require("./verify");
const User = require("../model/User")

// Private route for verified users
router.get('/', verify, async (req,res) => {

    // res.json({
    //     posts:
    //     {title:"my first post", 
    //     desc:"random data"}
    // });
    
    // res.send(req.user._id);
    
    const data = await User.findOne({_id: req.user._id},{password:0});
    res.send(data);
})

module.exports = router;