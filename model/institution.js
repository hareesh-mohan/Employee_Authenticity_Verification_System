const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  uniqueId: String,
  docHash: [String],
});

module.exports = mongoose.model("Institution", InstitutionSchema);
