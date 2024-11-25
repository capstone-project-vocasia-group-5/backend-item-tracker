const mongoose = require("mongoose");

// Schema Options
const schemaOptions = {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
};

// Schema Definition
const categoryItemsSchema = new mongoose.Schema(
  {
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      index: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },
    deleted_at: {
      type: Date,
    },
  },
  schemaOptions
);

// Indexes
categoryItemsSchema.index({ item_id: 1, deleted_at: 1 });
categoryItemsSchema.index({ category_id: 1, deleted_at: 1 });
categoryItemsSchema.index({ category_id: 1, item_id: 1, deleted_at: 1 });

const CategoryItems = mongoose.model("CategoryItems", categoryItemsSchema);

module.exports = {
  CategoryItems,
};
