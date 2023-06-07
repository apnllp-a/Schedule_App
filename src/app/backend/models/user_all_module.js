module.exports = mongoose => {
  var userAll_schema = mongoose.Schema(
    {
      firstname:{
        type:String,
        require:[true,'please enter a firstname']
      },
      lastname:{
        type:String,
        require:[true,'please enter a lastname']
      },
      
      username:{
        type:String,
        require:[true,'please enter a username']
      },
      password:{
        type:String,
        require:[true,'please enter a password']
      },
      email:{
        type:String,
        require:[true,'please enter a email']
      },
      tal:{
        type:String,
        require:[true,'please enter a tal']
      },
      published: Boolean
    },
    { timestamps: true }
  );

  userAll_schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const userAll = mongoose.model("userAll", userAll_schema);
  return userAll;
};