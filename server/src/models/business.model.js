import mongoose from 'mongoose'


// used for business organization and db name lookup
const BusinessSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  businessName: {
    type: String,
    required: true,
    unique: true
  },
  thumbnail: {
      type: String,
  },
  templateChannels: [{
    type: String
  }],
  api: [{
    name: {type: String},// display, video, social
    token: {type: String}, // secret token
    templateChannels: [{type: String}],
    url: {type: String}, // API access url
    permissions: [{type: String}] //sudo, admin, content-creator, analytics
  }]
});

// export the user schema
const Business = mongoose.model("Business", BusinessSchema);
module.exports = Business;
