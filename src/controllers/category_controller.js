const customError = require("../errors");
const RES = require("../config/resMessage");
const { Category, validateCategory } = require("../models/category_model");

const getAllCategories = async (req, res, next) => {
  const { page = 1, limit = 10, name = "" } = req.query;
  try {
    const validatedPage = !isNaN(page) && page > 0 ? parseInt(page, 10) : 1;
    const validatedLimit =
      !isNaN(limit) && limit > 0 ? parseInt(limit, 10) : 10;

    const query = {
      deleted_at: null,
    };

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    const totalCategories = await Category.countDocuments(query);

    const categories = await Category.find(query)
      .skip((validatedPage - 1) * validatedLimit)
      .limit(validatedLimit)
      .sort({ created_at: 1 });

    if (!categories) {
      throw new customError.NotFoundError(
        RES.DATA_IS_NOT_FOUND,
        RES.CATEGORIES_IS_NOT_FOUND
      );
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        categories,
      },
      pagination: {
        page: validatedPage,
        limit: validatedLimit,
        total: totalCategories,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createCategoryCMS = async (req, res, next) => {
  const { name } = req.body;

  try {
    const { error } = validateCategory.create(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const category = await Category.create({
      name,
    });

    if (!category) {
      throw new customError.InternalServerError(
        RES.SOMETHING_WENT_WRONG,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    res.status(201).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_CREATED,
      data: {
        category,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateCategoryCMS = async (req, res, next) => {
  const { name } = req.body;

  try {
    const { error } = validateCategory.update(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, deleted_at: null },
      { name },
      { new: true }
    );

    if (!category) {
      throw new customError.NotFoundError(
        RES.DATA_IS_NOT_FOUND,
        RES.CATEGORIES_IS_NOT_FOUND
      );
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_UPDATED,
      data: {
        category,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategoryCMS = async (req, res, next) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, deleted_at: null },
      { deleted_at: Date.now() },
      { new: true }
    );

    if (!category) {
      throw new customError.NotFoundError(
        RES.DATA_IS_NOT_FOUND,
        RES.CATEGORIES_IS_NOT_FOUND
      );
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_DELETED,
      data: {
        category,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategories,
  createCategoryCMS,
  updateCategoryCMS,
  deleteCategoryCMS,
};
