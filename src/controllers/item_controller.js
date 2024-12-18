const customError = require("../errors");
const RES = require("../config/resMessage");
const { Item, validateItem } = require("../models/item_model");
const cloudinaryServices = require("../services/cloudinary");
const fs = require("fs-extra");
const mongoose = require("mongoose");
const { CategoryItems } = require("../models/category_items_model");
const notificationService = require("../services/mongoose/notification_service");
const { EmailLogs } = require("../models/email_log_model");
const { User } = require("../models/user_model");
const CFG = require("../config/const");

const createItem = async (req, res, next) => {
  const {
    name,
    description,
    type,
    province,
    city,
    subdistrict,
    village,
    postal_code,
    phone_number,
    categories,
  } = req.body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { error } = validateItem.create(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    await cloudinaryServices(req, res);
    if (!req.body.images) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        RES.IMAGE_IS_REQUIRED
      );
    }

    const newItem = await Item.create(
      [
        {
          user_id: req.user.id,
          name,
          description,
          type,
          province,
          city,
          subdistrict,
          village,
          postal_code,
          phone_number,
          images: req.body.images,
        },
      ],
      { session }
    );

    if (!newItem) {
      throw new customError.InternalServerError(
        RES.SOMETHING_WENT_WRONG,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    if (typeof categories === "object") {
      const categoryItems = categories.map((category_id) => ({
        item_id: newItem[0].id,
        category_id,
      }));
      const createdCategoryItems = await CategoryItems.insertMany(
        categoryItems,
        { session }
      );

      if (!createdCategoryItems) {
        throw new customError.InternalServerError(
          RES.SOMETHING_WENT_WRONG,
          RES.SOMETHING_WENT_WRONG_WHILE_CREATING
        );
      }
    } else {
      const createdCategoryItems = await CategoryItems.create(
        [
          {
            item_id: newItem[0].id,
            category_id: categories,
          },
        ],
        { session }
      );

      if (!createdCategoryItems) {
        throw new customError.InternalServerError(
          RES.SOMETHING_WENT_WRONG,
          RES.SOMETHING_WENT_WRONG_WHILE_CREATING
        );
      }
    }

    const createdNotification = await notificationService.createNotification(
      {
        role: CFG.ROLES.ADMIN,
        title: RES.NEW_REPORT,
        item_id: newItem[0]?.id,
      },
      session
    );

    if (!createdNotification) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    await session.commitTransaction();

    res.status(201).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_CREATED,
      data: {
        item: newItem,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    next(err);
  } finally {
    await session.endSession();
  }
};

const updateItem = async (req, res, next) => {
  const item_id = req.params.id;
  const {
    name,
    description,
    type,
    province,
    city,
    subdistrict,
    village,
    postal_code,
    phone_number,
    matched_status,
    categories,
  } = req.body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { error } = validateItem.update(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const item = await Item.findOne({
      _id: item_id,
      user_id: req.user.id,
      deleted_at: null,
    }).session(session);

    if (!item) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
    }

    if (name) {
      item.name = name;
    }
    if (description) {
      item.description = description;
    }
    if (type) {
      item.type = type;
    }
    if (province) {
      item.province = province;
    }
    if (city) {
      item.city = city;
    }
    if (subdistrict) {
      item.subdistrict = subdistrict;
    }
    if (village) {
      item.village = village;
    }
    if (postal_code) {
      item.postal_code = postal_code;
    }
    if (phone_number) {
      item.phone_number = phone_number;
    }

    if (matched_status) {
      item.matched_status = matched_status;
    }

    if (req.files && req.files.length > 0) {
      await cloudinaryServices(req, res);
      if (!req.body.images) {
        throw new customError.BadRequestError(
          RES.VALIDATION_ERROR,
          RES.IMAGE_IS_REQUIRED
        );
      }
      item.images = req.body.images;
    }

    const newItem = await item.save({ session });
    if (!newItem) {
      throw new customError.InternalServerError(
        RES.SOMETHING_WENT_WRONG,
        RES.SOMETHING_WENT_WRONG_WHILE_UPDATING
      );
    }

    if (categories) {
      await CategoryItems.updateMany(
        {
          item_id: item_id,
          deleted_at: null,
        },
        {
          deleted_at: Date.now(),
        },
        { session }
      );

      const newCategories = categories.map((category_id) => ({
        item_id: item_id,
        category_id,
      }));
      const createdCategoryItems = await CategoryItems.insertMany(
        newCategories,
        { session }
      );

      if (!createdCategoryItems) {
        throw new customError.InternalServerError(
          RES.SOMETHING_WENT_WRONG,
          RES.SOMETHING_WENT_WRONG_WHILE_UPDATING
        );
      }
    }

    await session.commitTransaction();

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_UPDATED,
      data: {
        item: newItem,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    next(err);
  } finally {
    await session.endSession();
  }
};

const deleteItem = async (req, res, next) => {
  const item_id = req.params.id;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const query = { _id: item_id, deleted_at: null };

    if (req.user?.id && req.user?.role === CFG.ROLES.USER) {
      query.user_id = req.user.id;
    }

    const deletedItem = await Item.findOneAndUpdate(
      query,
      { deleted_at: Date.now() },
      { new: true, session }
    );

    if (!deletedItem) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
    }

    const deletedCategoryItems = await CategoryItems.updateMany(
      {
        item_id: item_id,
        deleted_at: null,
      },
      {
        deleted_at: Date.now(),
      },
      { session }
    );

    if (!deletedCategoryItems) {
      throw new customError.InternalServerError(
        RES.SOMETHING_WENT_WRONG,
        RES.SOMETHING_WENT_WRONG_WHILE_UPDATING
      );
    }

    if (req.user?.id && req.user?.role === CFG.ROLES.ADMIN) {
      const createdNotification = await notificationService.createNotification(
        {
          user_id: deletedItem.user_id,
          title: RES.REPORT_IS_DELETED_BY_ADMIN,
          item_id: deletedItem.id,
        },
        session
      );

      if (!createdNotification) {
        throw new customError.InternalServerError(
          RES.INTERNAL_SERVER_ERROR,
          RES.SOMETHING_WENT_WRONG_WHILE_CREATING
        );
      }
    }

    await session.commitTransaction();

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_DELETED,
      data: {
        item: deletedItem,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
};

const getItemById = async (req, res, next) => {
  const item_id = req.params.id;

  try {
    const item = await Item.findOne({
      _id: item_id,
      deleted_at: null,
    }).lean();

    if (!item) {
      throw new customError.NotFoundError(RES.NOT_FOUND, RES.DATA_IS_NOT_FOUND);
    }

    if (req.user?.id && req.user?.role === "user" && item.type === "found") {
      item.phone_number = null;
      item.messages = null;
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        item,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getAllItems = async (req, res, next) => {
  const {
    page,
    limit,
    type = "",
    matched_status = "",
    search = "",
    province = "",
    city = "",
    subdistrict = "",
    village = "",
    postal_code = "",
    own,
    approved,
  } = req.query;

  try {
    const validatedPage = page ? Math.max(Number(page), 1) : undefined;
    let validatedLimit = limit ? Math.max(Number(limit), 1) : undefined;
    let skip = validatedLimit
      ? (validatedPage - 1) * validatedLimit
      : undefined;

    if (isNaN(validatedLimit)) {
      validatedLimit = undefined;
    }

    if (isNaN(skip)) {
      skip = undefined;
    }

    const ownCnv = own === "true" ? true : false;
    const matchedStatus = matched_status === "true" ? true : false;
    const approvedStatus = approved === "true" ? true : false;
    let user_id;

    if (req.user?.id) {
      user_id = mongoose.Types.ObjectId.createFromHexString(req.user?.id);
    }

    const query = {
      deleted_at: null,
    };

    if (matched_status) {
      query.matched_status = matchedStatus;
    }

    if (req.user?.id && req.user?.role === "user" && ownCnv) {
      query.user_id = user_id;
    } else if (req.user?.id && req.user?.role === "admin") {
      if (approved) {
        query.approved = approvedStatus;
      }
    } else {
      query.approved = true;
    }

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
      skip = undefined;
      validatedLimit = undefined;
    }

    ["type", "province", "city", "subdistrict", "village"].forEach((field) => {
      if (req.query[field]) {
        query[field] = req.query[field];
      }
    });

    if (province) {
      if (
        typeof skip !== "undefined" ||
        typeof validatedLimit !== "undefined"
      ) {
        validatedLimit = undefined;
        skip = undefined;
      }
    }

    const postalCodeNumber = parseInt(postal_code, 10);
    if (!isNaN(postalCodeNumber)) {
      query.postal_code = postalCodeNumber;
    }

    const pipeline = [
      { $match: query },
      { $sort: { created_at: -1, _id: -1 } },
    ];
    if (typeof skip !== "undefined") {
      pipeline.push({ $skip: skip });
    }

    if (typeof validatedLimit !== "undefined") {
      pipeline.push({ $limit: validatedLimit });
    }

    pipeline.push(
      {
        $lookup: {
          from: "categoryitems",
          localField: "_id",
          foreignField: "item_id",
          as: "categoryItems",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryItems.category_id",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
      {
        $project: {
          name: 1,
          images: 1,
          description: 1,
          matched_status: 1,
          type: 1,
          approved: 1,
          province: 1,
          city: 1,
          subdistrict: 1,
          village: 1,
          postal_code: 1,
          message: {
            $cond: {
              if: ownCnv || req.user?.role === "admin",
              then: "$messages",
              else: null,
            },
          },
          phone_number: {
            $cond: {
              if: ownCnv || req.user?.role === "admin",
              then: "$phone_number",
              else: null,
            },
          },
          categories: {
            _id: 1,
            name: 1,
          },
        },
      }
    );

    const items = await Item.aggregate(pipeline);

    const total_items = await Item.countDocuments(query);

    res.status(200).json({
      success: RES.SUCCESS,
      message: items.length ? RES.SUCCESSFULLY_FETCHED : RES.DATA_IS_NOT_FOUND,
      data: {
        items,
        page: validatedPage,
        limit: validatedLimit,
        total_items,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getTotalItem = async (req, res, next) => {
  try {
    const totalItems = await Item.countDocuments({
      deleted_at: null,
      approved: true,
    });

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        total_items: totalItems,
      },
    });
  } catch (err) {
    next(err);
  }
};

const approveItemCMS = async (req, res, next) => {
  const session = await mongoose.startSession();
  const { messages } = req.body;
  try {
    session.startTransaction();
    const item = await Item.findOne({
      _id: req.params.id,
      approved: false,
      deleted_at: null,
    }).session(session);

    if (!item) {
      throw new customError.NotFoundError(
        RES.DATA_IS_NOT_FOUND,
        RES.ITEM_NOT_FOUND
      );
    }

    item.approved = true;
    if (messages) {
      item.messages = messages;
    }
    await item.save({ session });

    const createdNotification = await notificationService.createNotification(
      {
        user_id: item.user_id,
        title: RES.ITEM_APPROVED,
        item_id: item.id,
      },
      session
    );

    if (!createdNotification) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    const user = await User.findById(item.user_id).session(session);

    const emailLog = await EmailLogs.create(
      [
        {
          item_id: item.id,
          name: user.name,
          email: user.email,
          type: RES.REPORT,
          subject: RES.SUBJECT_REPORT_APPROVED,
          title: RES.REPORT_APPROVED,
          description: RES.DESCRIPTION_REPORT_APPROVED,
        },
      ],
      { session }
    );

    if (!emailLog) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    await session.commitTransaction();

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_APPROVED,
      data: {
        item,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
};

const rejectItemCMS = async (req, res, next) => {
  const session = await mongoose.startSession();
  const { messages } = req.body;
  try {
    session.startTransaction();

    if (!messages) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        RES.MESSAGES_IS_REQUIRED
      );
    }

    const item = await Item.findOne({
      _id: req.params.id,
      approved: false,
      deleted_at: null,
    }).session(session);

    if (!item) {
      throw new customError.NotFoundError(
        RES.DATA_IS_NOT_FOUND,
        RES.ITEM_NOT_FOUND
      );
    }

    item.approved = false;
    item.messages = messages;
    await item.save({ session });

    const createdNotification = await notificationService.createNotification(
      {
        user_id: item.user_id,
        title: RES.ITEM_REJECTED,
        item_id: item.id,
      },
      session
    );

    if (!createdNotification) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    const user = await User.findById(item.user_id).session(session);

    const emailLog = await EmailLogs.create(
      [
        {
          item_id: item.id,
          name: user.name,
          email: user.email,
          type: RES.REPORT,
          subject: RES.SUBJECT_REPORT_REJECTED,
          title: RES.REPORT_REJECTED,
          description: RES.DESCRIPTION_REPORT_REJECTED + " " + messages,
        },
      ],
      { session }
    );

    if (!emailLog) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    await session.commitTransaction();

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_REJECTED,
      data: {
        item,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
};

module.exports = {
  createItem,
  updateItem,
  deleteItem,
  getItemById,
  getAllItems,
  getTotalItem,
  approveItemCMS,
  rejectItemCMS,
};
