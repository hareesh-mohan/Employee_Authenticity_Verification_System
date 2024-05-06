const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  uniqueId: String,
  docHash: [String],
});

module.exports = mongoose.model("Company", CompanySchema);
