const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
      required: true,
    },
  },
  // Schema Options
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("File", fileSchema);
