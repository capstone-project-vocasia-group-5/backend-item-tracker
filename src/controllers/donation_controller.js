const customError = require("../errors");
const RES = require("../config/resMessage");
const { Donation, validateDonation } = require("../models/donation_model");
const { DonationLogs } = require("../models/donation_log_model");
const midtransClient = require("midtrans-client");
const { clientKey, serverKey } = require("../config/config");
const mongoose = require("mongoose");
const notificationService = require("../services/mongoose/notification_service");
const emailService = require("../services/mail/index");
const CFG = require("../config/const");

const createDonation = async (req, res, next) => {
  const { name, email, amount, is_anonymous } = req.body;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { error } = validateDonation.create(req.body);
    if (error) {
      throw new customError.BadRequestError(
        RES.VALIDATION_ERROR,
        error.details[0].message
      );
    }

    const donation = new Donation({
      name,
      email,
      amount,
      is_anonymous,
    });
    await donation.save({ session });

    const donationLogs = new DonationLogs({
      donation_id: donation.id,
      status_logs: "pending",
    });
    await donationLogs.save({ session });

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: serverKey,
      clientKey: clientKey,
    });

    const parameter = {
      transaction_details: {
        order_id: donation.id,
        gross_amount: donation.amount,
      },
      customer_details: {
        first_name: name,
        email: email,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    const paymentUrl = transaction.redirect_url;

    await session.commitTransaction();

    res.status(201).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_CREATED,
      data: { paymentUrl },
    });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
};

const midtransWebHook = async (req, res, next) => {
  const { transaction_status, order_id, payment_type } = req.body;

  // Validasi Input
  if (!transaction_status || !order_id || !payment_type) {
    return res.status(400).json({
      success: RES.ERROR,
      message: RES.BAD_REQUEST,
      error: RES.INVALID_TRANSACTION_DATA,
    });
  }

  const STATUS_MAP = {
    settlement: "success",
    capture: "success",
    deny: "failed",
    cancel: "failed",
    expire: "failed",
    failure: "failed",
  };

  const status = STATUS_MAP[transaction_status];
  if (!status) {
    return res.status(400).json({
      success: RES.ERROR,
      message: RES.BAD_REQUEST,
      error: RES.INVALID_TRANSACTION_STATUS,
    });
  }

  const session = status ? await mongoose.startSession() : null;

  try {
    if (session) session.startTransaction();

    const donation = await updateDonationStatus(
      order_id,
      status,
      payment_type,
      session
    );

    if (!donation) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    const donationLogs = await createDonationLogs(donation.id, status, session);
    if (!donationLogs) {
      throw new customError.InternalServerError(
        RES.INTERNAL_SERVER_ERROR,
        RES.SOMETHING_WENT_WRONG_WHILE_CREATING
      );
    }

    if (session) await session.commitTransaction();

    if (donation.status === "success") {
      await notificationService.createNotification({
        role: CFG.ROLES.ADMIN,
        title: RES.DONATION_SUCCESS + " Sebesar " + donation.formatted_amount,
        donation_id: donation.id,
      });

      await emailService.thanksMail(donation.email, {
        name: donation.name,
        email: donation.email,
        amount: donation.formatted_amount,
      });
    }

    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_UPDATED,
    });
  } catch (err) {
    if (session) await session.abortTransaction();
    next(err);
  } finally {
    if (session) await session.endSession();
  }
};

// Helper Functions
const updateDonationStatus = async (orderId, status, payment_type, session) => {
  return Donation.findOneAndUpdate(
    { _id: orderId },
    { status, payment_method: payment_type },
    { new: true, session }
  );
};

const createDonationLogs = async (donation_id, status_logs, session) => {
  const donationLogs = new DonationLogs({
    donation_id,
    status_logs,
  });
  return await donationLogs.save({ session });
};

const getAllDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({
      is_anonymous: false,
      status: "success",
    });
    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        donations,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getTotalAmountDonation = async (req, res, next) => {
  try {
    const totalAmount = await Donation.aggregate([
      {
        $match: {
          status: "success",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    res.status(200).json({
      success: RES.SUCCESS,
      message: RES.SUCCESSFULLY_FETCHED,
      data: {
        totalAmount,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createDonation,
  midtransWebHook,
  getAllDonations,
  getTotalAmountDonation,
};
