require("dotenv").config();
const { urlDb } = require("../config/config");
const mongoose = require("mongoose");
const { User } = require("../models/user_model");
const { Category } = require("../models/category_model");
const { Claim } = require("../models/claim_model");
const { Donation } = require("../models/donation_model");
const { Item } = require("../models/item_model");
const { Comment } = require("../models/comment_model");
const { Notification } = require("../models/notification_model");
const { CategoryItems } = require("../models/category_items_model");

const {
  categories,
  claims,
  donations,
  items,
  users,
  comments,
  notifications,
} = require("./data");

const importData = async () => {
  try {
    await mongoose.connect(urlDb);
    await deleteData();

    const createdUser = await User.create(users);
    const createdCategories = await Category.create(categories);

    for (let i = 0; i < items.length; i++) {
      items[i].user_id = createdUser[0].id;
      items[i].category_id = createdCategories[i]
        ? createdCategories[i].id
        : null;
    }

    const createdItems = await Item.create(items);

    for (let i = 0; i < items.length; i++) {
      if (createdCategories[i]) {
        await CategoryItems.create({
          category_id: createdCategories[i].id,
          item_id: createdItems[i].id,
        });
      }
    }

    for (let i = 0; i < comments.length; i++) {
      comments[i].user_id = createdUser[2].id;
      comments[i].item_id = createdItems[0].id;
    }

    const createdComments = await Comment.insertMany(comments);

    claims[0].user_id = createdUser[2].id;
    claims[0].item_id = createdItems[0].id;
    claims[0].to_user_id = createdUser[0].id;

    const createdClaims = await Claim.insertMany(claims);
    notifications[0].user_id = createdUser[0].id;
    notifications[0].claim_id = createdClaims[0].id;
    notifications[1].user_id = createdUser[0].id;
    notifications[1].item_id = createdItems[0].id;
    notifications[2].user_id = createdUser[0].id;
    notifications[2].comment_id = createdComments[0].id;

    await Notification.insertMany(notifications);
    await Donation.insertMany(donations);

    console.log("Data imported successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await mongoose.connect(urlDb);
    await Category.deleteMany();
    await Claim.deleteMany();
    await Donation.deleteMany();
    await Item.deleteMany();
    await User.deleteMany();
    await Comment.deleteMany();
    await CategoryItems.deleteMany();
    await Notification.deleteMany();
    console.log("Data deleted successfully");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};

importData();
