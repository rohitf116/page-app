const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter a Name"],
      trim: true,
      maxlength: [25, "Name can not be more than 50 chars"],
    },

    style_sheets: {
      type: Array,
      default: [],
      sparse: true,
    },

    scripts: {
      type: Array,
      default: [],
      sparse: true,
    },

    slug: {
      type: String,

    },

    favicon: {
      type: String,
      sparse: true,
    },



    domain_name: {
      type: String,
    },

    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
      default:"636d4d751d735101839b2abb",
    },

    published: {
      type: Boolean,
      default: false,
    },



    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      sparse: true,
    },
    url:{type:String,default:"preview.myzer.io/agency-course"},
    content: {
      type: Object,
      select: false,
    },
    assets: {
      type: Array,
      select: false,
    },
    metadata: {
      type: Object,
      sparse: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      sparse: true,
    },
    popUps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PopUp",
        sparse: true,
      },
    ],
    sessions: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Page", pageSchema);