const RES = require("../config/resMessage");
const { CategoryItems } = require("../models/category_items_model");

const getAllCategoryWithTotalItems = async (req, res, next) => {
  try {
    const categories = await CategoryItems.aggregate([
      {
        $match: {
          deleted_at: null,
        },
      },
      {
        $group: {
          _id: "$category_id",
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          total: 1,
          name: { $arrayElemAt: ["$category.name", 0] },
          created_at: { $arrayElemAt: ["$category.created_at", 0] },
          deleted_at: { $arrayElemAt: ["$category.deleted_at", 0] },
        },
      },
    ]);

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        categories,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategoryWithTotalItems,
};
