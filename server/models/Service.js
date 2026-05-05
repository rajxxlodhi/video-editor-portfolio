const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    deliveryTime: {
      type: String,
      required: true,
      trim: true
    },
    revisions: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      default: "Scissors"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
