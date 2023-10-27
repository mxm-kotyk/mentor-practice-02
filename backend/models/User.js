const { Schema, model } = require("mongoose");

const SchemaUser = new Schema(
  {
    name: {
      type: String,
      default: "Michael Douglas",
    },
    email: {
      type: String,
      required: [true, "DB: 'email' is required"],
    },
    password: {
      type: String,
      required: [true, "DB: 'password' is required"],
    },
    token: {
      type: String,
      default: null,
    },
    roles: [
      {
        type: String,
        ref: "role",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("user", SchemaUser);
