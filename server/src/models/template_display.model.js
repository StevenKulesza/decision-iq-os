import mongoose from 'mongoose'


// used for business organization and db name lookup
const Template_DisplaySchema = new mongoose.Schema({
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
  sizes: {
    type: Object
  },
  template: {
    type: Object
  },
  business: {
    type: String
  }
});

// export the user schema
const Template_Display = mongoose.model("Template_display", Template_DisplaySchema);
module.exports = Template_Display;
