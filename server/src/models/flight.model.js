import mongoose from 'mongoose'


// used for business organization and db name lookup
const FlightSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: Object
  },
  business: {
    type: String
  },
  template: {
    type: String
  }
});

// export the user schema
const Flight = mongoose.model("Flight", FlightSchema);
module.exports = Flight;
