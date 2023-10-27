const { Schema, model } = require("mongoose");

const SchemaRole = new Schema(
  {
    value: {
      type: String,
      default: "USER",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("role", SchemaRole);
