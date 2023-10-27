const { Schema, model } = require("mongoose");

const SchemaCats = new Schema(
  {
    name: { type: String, required: [true, "DB: 'name' is required"] },
    color: { type: String, default: "black" },
    age: { type: Number, required: [true, "DB: 'age' is required"] },
    owner: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("cat", SchemaCats);
