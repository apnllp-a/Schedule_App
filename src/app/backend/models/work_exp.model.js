const mongoose = require("mongoose");

const work_exp = mongoose.model(
    "Work_Exp",
    new mongoose.Schema({
        company: String,
        position: String,
        start_date: Date,
        end_date: Date,
        user: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
    })
)
module.exports = work_exp;