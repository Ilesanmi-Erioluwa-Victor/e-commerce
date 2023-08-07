const mongoose = require("mongoose");

const ValidateMongoId = id => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error("Sorry, ID not valid, try again...")
}

module.exports = ValidateMongoId
