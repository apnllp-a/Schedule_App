// const mongoose = require("mongoose");
module.exports = mongoose => {
var Data_user_schema = new mongoose.Schema(
{
    name: String,
    department:String,
    position:String,
    address:String,
    phone:String,
    phone_iffice:String,
    date:Date,
    age:String,
    user_id:String,
    published: Boolean
},
{ timestamps: true }
);

Data_user_schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});


const DataUser = mongoose.model("data_users", Data_user_schema);
return DataUser;

};