const mongoose = require("mongoose");

const Education = mongoose.model(
    "Education",
    new mongoose.Schema({
        degree:String,
        major:String,
        school:String,
        user:[{
            type: mongoose.Schema.Types.ObjectId,
              ref: "User"
          }]
    })
);

module.exports = Education;