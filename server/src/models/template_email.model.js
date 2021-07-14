import mongoose from 'mongoose'


// used for business organization and db name lookup
const Template_EmailSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  type:{
    type: String
  },
  imageUrl:{
    type: String
  },
  sizes: [{
    height: {type: Number},
    width: {type: Number},
    imageUrl: {type: String}
  }],
  template: {
    type: Object
  },
  business: {
    type: String
  }
});

// export the user schema
const Template_Email = mongoose.model("Template_email", Template_EmailSchema);
module.exports = Template_Email;
