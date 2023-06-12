const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./model.js")(mongoose);
db.userAll = require("./user_all_module.js")(mongoose)
db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

// module.exports = {
//     Tutorial: require("./Tutorial"),
//     Image: require("./Image"),
//     Comment: require("./Comment"),
//     Category: require("./Category")
//   };