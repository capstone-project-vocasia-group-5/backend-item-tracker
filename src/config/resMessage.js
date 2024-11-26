const RES = {
  SUCCESSFULLY_DELETED: "successfully deleted",
  SUCCESSFULLY_CREATED: "successfully created",
  SUCCESSFULLY_UPDATED: "successfully updated",
  SUCCESSFULLY_FETCHED: "successfully fetched",
  SUCCESSFULLY_UPLOADED: "successfully uploaded",

  SUCCESS: true,
  ERROR: false,
  FAILED: "failed",
  FAILED_TO_GET_DATA: "failed to get data",

  VALIDATION_ERROR: "validation error",
  UNAUTHORIZED_ERROR: "unauthorized",

  SOMETHING_WENT_WRONG: "something went wrong",
  SOMETHING_WENT_WRONG_TRY_AGAIN_LATER:
    "something went wrong, please try again later",
  SOMETHING_WENT_WRONG_WHILE_CREATING: "something went wrong while creating",
  SOMETHING_WENT_WRONG_WHILE_UPDATING: "something went wrong while updating",
  SOMETHING_WENT_WRONG_WHILE_UPLOADING: "something went wrong while uploading",
  SOMETHING_WENT_WRONG_WHILE_FETCHING:
    "something went wrong while fetching data",
  SOMETHING_WENT_WRONG_WHILE_DELETING: "something went wrong while deleting",
  SOMETHING_WENT_WRONG_WHILE_RETURNING: "something went wrong while returning",

  UNSUPPORT_FILE_FORMAT: "unsupported file format",
  ROUTE_DOES_NOT_EXIST: "route does not exist",

  ERROR_CONNECTING_TO_MONGODB: "error connecting to mongodb",

  MONGO_DB_CONNECTED: "mongodb connected",

  IMAGE_IS_REQUIRED: "image is required",

  NO_CONTENT_UPDATED: "no content updated",
  FILE_IS_NOT_EXIST: "file does not exist",

  INTERNAL_SERVER_ERROR: "internal server error",
  BAD_REQUEST: "bad request",
  CONFLICT: "conflict",
  NOT_FOUND: "not found",

  // VALIDATIONS
  USERNAME_SHOULD_HAVE_MINIMUM_3_CHARACTERS:
    "username should have at least 3 characters",
  USERNAME_SHOULD_HAVE_MAXIMUM_50_CHARACTERS:
    "username should have a maximum of 50 characters",
  ANOTHER: "another",
  PLEASE_CHOOSE: "please choose",
  DUPLICATE_VALUE_ENTERED_FOR: "duplicate value entered for",
  DUPLICATE_VALUE: "conflict",
  ALREADY_EXISTS: "already exists",
  USERNAME_ALREADY_EXISTS: "username already exists",
  EMAIL_IS_REQUIRED: "email is required",
  PLEASE_PROVIDE_VALID_NAME: "please provide a valid name",
  PLEASE_PROVIDE_VALID_USERNAME: "please provide a valid username",
  PLEASE_PROVIDE_VALID_EMAIL: "please provide a valid email",
  PLEASE_PROVIDE_VALID_PASSWORD: "please provide a valid password",
  PLEASE_PROVIDE_VALID_PASSWORD_CONFIRMATION:
    "please provide a valid password confirmation",
  PLEASE_PROVIDE_VALID_IMAGE: "please provide a valid image",
  PLEASE_PROVIDE_VALID_PHONE_NUMBER: "please provide a valid phone number",
  PHONE_NUMBER_MUST_START_WITH:
    "phone number must start with +62 or 62 and have 8 to 13 digits",
  NAME_SHOULD_HAVE_MINIMUM_3_CHARACTERS:
    "name should have at least 3 characters",
  NAME_SHOULD_HAVE_MAXIMUM_50_CHARACTERS:
    "name should have a maximum of 50 characters",
  PASSWORD_MUST_CONTAINT_ONLY_LETTERS_AND_NUMBERS:
    "password must contain only letters and numbers",
  MINIMUM_DONATION_AMOUNT_IS_10000: "minimum donation is 10000",
  PLEASE_PROVIDE_VALID_COMMENT_TEXT: "please provide valid comment text",
  COMMENT_TEXT_SHOULD_HAVE_MAXIMUM_500_CHARACTERS:
    "comment text should have a maximum of 500 characters",
  PLEASE_PROVIDE_VALID_DESCRIPTION: "please provide a valid description",
  PLEASE_PROVIDE_VALID_TYPE: "please provide a valid type",
  NAME_IS_REQUIRED: "name is required",
  PLEASE_PROVIDE_VALID_PROVINCE: "please provide a valid province",
  PLEASE_PROVIDE_VALID_CITY: "please provide a valid city",
  PLEASE_PROVIDE_VALID_SUBDISTRICT: "please provide a valid subdistrict",
  PLEASE_PROVIDE_VALID_VILLAGE: "please provide a valid village",
  PLEASE_PROVIDE_VALID_POSTAL_CODE: "please provide a valid postal code",
  PLEASE_PROVIDE_VALID_AMOUNT: "please provide a valid amount",
  DESCRIPTION_SHOULD_HAVE_MAXIMUM_500_CHARACTERS:
    "description should have a maximum of 500 characters",
  PLEASE_PROVIDE_VALID_SUBDISTRICT: "please provide a valid subdistrict",
  IMAGE_MUST_BE_VALID_URI: "image must be a valid URI",
  PLEASE_PROVIDE_VALID_COMMENT_TEXT: "please provide valid comment text",
  PLEASE_PROVIDE_VALID_CLAIM_TEXT: "please provide valid claim text",
  CLAIM_TEXT_SHOULD_HAVE_MAXIMUM_500_CHARACTERS:
    "claim text should have a maximum of 500 characters",
  PLEASE_PROVIDE_VALID_IMAGE_URL: "please provide a valid image URL",
  PLEASE_PROVIDE_VALID_USER_ID: "please provide a valid user ID",
  PLEASE_PROVIDE_VALID_ITEM_ID: "please provide a valid item ID",
  PLEASE_PROVIDE_VALID_EMAIL: "please provide a valid email",
  CREDENTIAL_IS_WRONG: "credentials is wrong",
  PASSWORD_MUST_CONTAINT_AT_LEAST_6_CHARACTERS:
    "password must contain at least 6 characters",
  YOUR_EMAIL_DOES_NOT_MATCH_WITH_ANY_ACCOUNT:
    "your email does not match any account",
  PLEASE_PROVIDE_VALID_OTP: "please provide a valid otp",

  // AUTH
  SIGN_IN_SUCCESS: "sign in successful",
  INVALID_OTP: "invalid otp",
  YOUR_OTP_IS_EXPIRED: "your otp has expired",
  OTP_VERIFICATION_SUCCESS: "otp verification successful",
  UNAUTHORIZED: "unauthorized",
  UNAUTHORIZED_ACCESS: "unauthorized access",

  // MESSAGE
  SEND_OTP_SUCCESS: "otp sent successfully",
  SIGN_UP_SUCCESS: "sign up successful",
  DATA_IS_NOT_FOUND: "data not found",
  USERS_IS_NOT_FOUND: "user not found",
  CATEGORIES_IS_NOT_FOUND: "category not found",
  CLAIMS_IS_NOT_FOUND: "claim not found",
  CLAIM_ALREADY_EXISTS: "your claim already exists",
};

module.exports = RES;
