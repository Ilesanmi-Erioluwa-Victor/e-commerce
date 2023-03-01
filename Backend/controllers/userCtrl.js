const User = require("../models/userModel");

exports.createUser = async (req, res) => {
    const email = req?.body?.email;
    
    const findUser = await User.findOne(email);
    if (!findUser) {
        // Create a new user
        const user = await User.create({
            fir
        })
    } else {
        
    }
};
