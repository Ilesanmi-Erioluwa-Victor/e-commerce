const User = require("../models/userModel");

exports.createUser = async (req, res) => {
    const email = req?.body?.email;
    
    const findUser = await User.findOne(email);
    if (!findUser) {
        // Create a new user
        const user = await User.create({
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            password : req?.body?.password
        })
    } else {
        
    }
};
