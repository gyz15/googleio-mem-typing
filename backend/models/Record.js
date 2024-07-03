const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecordSchema = new Schema({
  name: {
    type: String,
  },
  marks: {
    type: Number,
  },
  createdTime: {
    type: Date,
  },
});

module.exports = Record = mongoose.model("record", RecordSchema);
