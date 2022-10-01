const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  primaryText: String,
  description: String,
  cta: {
    type: String,
    enum: ["Sign Up", "Shop Now", "Learn More", "Order Now"],
  },
  imgurl: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("Ad", adSchema);
