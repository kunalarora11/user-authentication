const User = require('../model/User');

const private = async (req,res) => {
     // res.json({
    //     posts:
    //     {title:"my first post", 
    //     desc:"random data"}
    // });
    
    // res.send(req.user._id);
    
    const data = await User.findOne({_id: req.user._id},{password:0}); 
    // not sendning the password because of security issues
    res.send(data);
}

module.exports = private;