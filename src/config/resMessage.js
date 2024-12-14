const RES = {
  SUCCESSFULLY_DELETED: "berhasil dihapus",
  SUCCESSFULLY_CREATED: "berhasil dibuat",
  SUCCESSFULLY_UPDATED: "berhasil diperbarui",
  SUCCESSFULLY_FETCHED: "berhasil diambil",
  SUCCESSFULLY_UPLOADED: "berhasil diunggah",
  SUCCESSFULLY_REJECTED: "berhasil ditolak",
  SUCCESSFULLY_APPROVED: "berhasil disetujui",

  SUCCESS: true,
  ERROR: false,
  FAILED: "gagal",
  FAILED_TO_GET_DATA: "gagal mengambil data",

  VALIDATION_ERROR: "kesalahan validasi",
  ALL_FIELDS_REQUIRED: "semua field diperlukan",
  UNAUTHORIZED_ERROR: "tidak sah",

  SOMETHING_WENT_WRONG: "terjadi kesalahan",
  SOMETHING_WENT_WRONG_TRY_AGAIN_LATER: "terjadi kesalahan, coba lagi nanti",
  SOMETHING_WENT_WRONG_WHILE_CREATING: "terjadi kesalahan saat membuat",
  SOMETHING_WENT_WRONG_WHILE_UPDATING: "terjadi kesalahan saat memperbarui",
  SOMETHING_WENT_WRONG_WHILE_UPLOADING: "terjadi kesalahan saat mengunggah",
  SOMETHING_WENT_WRONG_WHILE_FETCHING: "terjadi kesalahan saat mengambil data",
  SOMETHING_WENT_WRONG_WHILE_DELETING: "terjadi kesalahan saat menghapus",
  SOMETHING_WENT_WRONG_WHILE_RETURNING: "terjadi kesalahan saat mengembalikan",

  UNSUPPORT_FILE_FORMAT: "format file tidak didukung",
  ROUTE_DOES_NOT_EXIST: "rute tidak ada",

  ERROR_CONNECTING_TO_MONGODB: "kesalahan saat menghubungkan ke mongodb",

  MONGO_DB_CONNECTED: "mongodb terhubung",

  IMAGE_IS_REQUIRED: "gambar diperlukan",

  NO_CONTENT_UPDATED: "tidak ada konten yang diperbarui",
  FILE_IS_NOT_EXIST: "file tidak ditemukan",

  INTERNAL_SERVER_ERROR: "kesalahan server internal",
  BAD_REQUEST: "permintaan buruk",
  CONFLICT: "konflik",
  NOT_FOUND: "tidak ditemukan",

  // VALIDASI
  MESSAGES_IS_REQUIRED: "pesan diperlukan",
  ITEM_NOT_FOUND: "item tidak ditemukan",
  INVALID_TRANSACTION_DATA: "data transaksi tidak valid",
  INVALID_TRANSACTION_STATUS: "status transaksi tidak valid",
  USERNAME_SHOULD_HAVE_MINIMUM_3_CHARACTERS:
    "username harus memiliki minimal 3 karakter",
  USERNAME_SHOULD_HAVE_MAXIMUM_50_CHARACTERS:
    "username harus memiliki maksimal 50 karakter",
  ANOTHER: "lainnya",
  PLEASE_CHOOSE: "silakan gunakan",
  DUPLICATE_VALUE_ENTERED_FOR: "nilai duplikat dimasukkan untuk",
  DUPLICATE_VALUE: "konflik",
  ALREADY_EXISTS: "sudah ada",
  USERNAME_ALREADY_EXISTS: "username sudah ada",
  EMAIL_IS_REQUIRED: "email diperlukan",
  PLEASE_PROVIDE_VALID_NAME: "silakan berikan nama yang valid",
  PLEASE_PROVIDE_VALID_USERNAME: "silakan berikan username yang valid",
  PLEASE_PROVIDE_VALID_EMAIL: "silakan berikan email yang valid",
  PLEASE_PROVIDE_VALID_TITLE: "silakan berikan judul yang valid",
  PLEASE_PROVIDE_VALID_PASSWORD: "silakan berikan kata sandi yang valid",
  PLEASE_PROVIDE_VALID_PASSWORD_CONFIRMATION:
    "silakan berikan konfirmasi kata sandi yang valid",
  PLEASE_PROVIDE_VALID_IMAGE: "silakan berikan gambar yang valid",
  PLEASE_PROVIDE_VALID_PHONE_NUMBER: "silakan berikan nomor telepon yang valid",
  PHONE_NUMBER_MUST_START_WITH:
    "nomor telepon harus diawali +62 atau 62 dan memiliki 8 hingga 13 digit",
  NAME_SHOULD_HAVE_MINIMUM_3_CHARACTERS:
    "nama harus memiliki minimal 3 karakter",
  NAME_SHOULD_HAVE_MAXIMUM_50_CHARACTERS:
    "nama harus memiliki maksimal 50 karakter",
  PASSWORD_MUST_CONTAINT_ONLY_LETTERS_AND_NUMBERS:
    "kata sandi hanya boleh berisi huruf dan angka",
  MINIMUM_DONATION_AMOUNT_IS_10000: "donasi minimum adalah 10000",
  PLEASE_PROVIDE_VALID_COMMENT_TEXT: "silakan berikan teks komentar yang valid",
  COMMENT_TEXT_SHOULD_HAVE_MAXIMUM_500_CHARACTERS:
    "teks komentar harus memiliki maksimal 500 karakter",
  PLEASE_PROVIDE_VALID_DESCRIPTION: "silakan berikan deskripsi yang valid",
  PLEASE_PROVIDE_VALID_TYPE: "silakan berikan tipe yang valid",
  NAME_IS_REQUIRED: "nama diperlukan",
  PLEASE_PROVIDE_VALID_PROVINCE: "silakan berikan provinsi yang valid",
  PLEASE_PROVIDE_VALID_CITY: "silakan berikan kota yang valid",
  PLEASE_PROVIDE_VALID_SUBDISTRICT: "silakan berikan kecamatan yang valid",
  PLEASE_PROVIDE_VALID_VILLAGE: "silakan berikan desa yang valid",
  PLEASE_PROVIDE_VALID_POSTAL_CODE: "silakan berikan kode pos yang valid",
  PLEASE_PROVIDE_VALID_AMOUNT: "silakan berikan jumlah yang valid",
  PLEASE_PROVIDE_VALID_PAYMENT_METHOD:
    "silakan berikan metode pembayaran yang valid",
  DESCRIPTION_SHOULD_HAVE_MAXIMUM_500_CHARACTERS:
    "deskripsi harus memiliki maksimal 500 karakter",
  IMAGE_MUST_BE_VALID_URI: "gambar harus berupa URI yang valid",
  PLEASE_PROVIDE_VALID_IMAGE_URL: "silakan berikan URL gambar yang valid",
  PLEASE_PROVIDE_VALID_USER_ID: "silakan berikan ID pengguna yang valid",
  PLEASE_PROVIDE_VALID_ITEM_ID: "silakan berikan ID item yang valid",
  CREDENTIAL_IS_WRONG: "kredensial salah",
  PASSWORD_MUST_CONTAINT_AT_LEAST_6_CHARACTERS:
    "kata sandi harus memiliki minimal 6 karakter",
  YOUR_EMAIL_DOES_NOT_MATCH_WITH_ANY_ACCOUNT:
    "email Anda tidak cocok dengan akun mana pun",
  PLEASE_PROVIDE_VALID_OTP: "silakan berikan OTP yang valid",
  CATEGORY_ID_MUST_BE_VALID: "ID kategori harus valid",
  PLEASE_PROVIDE_VALID_IS_ANONYMOUS: "silakan berikan isAnonymous yang valid",
  PLEASE_PROVIDE_VALID_CATEGORY_ID: "silakan berikan ID kategori yang valid",
  ITEM_ALREADY_MATCHED: "item sudah cocok",
  PLEASE_PROVIDE_VALID_CLAIM_TEXT: "silakan berikan teks pengajuan yang valid",
  CLAIM_TEXT_SHOULD_HAVE_MAXIMUM_500_CHARACTERS:
    "teks pengajuan harus memiliki maksimal 500 karakter",

  // AUTH
  SIGN_IN_SUCCESS: "masuk berhasil",
  INVALID_OTP: "OTP tidak valid",
  YOUR_OTP_IS_EXPIRED: "OTP Anda telah kedaluwarsa",
  OTP_VERIFICATION_SUCCESS: "verifikasi OTP berhasil",
  UNAUTHORIZED: "tidak sah",
  UNAUTHORIZED_ACCESS: "akses tidak sah",

  // PESAN
  SEND_OTP_SUCCESS: "OTP berhasil dikirim",
  SIGN_UP_SUCCESS: "pendaftaran berhasil",
  DATA_IS_NOT_FOUND: "data tidak ditemukan",
  NOTIFICATION_NOT_FOUND: "notifikasi tidak ditemukan",
  USERS_IS_NOT_FOUND: "pengguna tidak ditemukan",
  CATEGORIES_IS_NOT_FOUND: "kategori tidak ditemukan",
  CLAIMS_IS_NOT_FOUND: "klaim tidak ditemukan",
  CLAIM_ALREADY_EXISTS: "klaim Anda sudah ada",
  ITEM_IS_NOT_FOUND: "item tidak ditemukan",
  YOU_CANNOT_CLAIM_YOUR_OWN_ITEM:
    "Anda tidak dapat mengklaim item Anda sendiri",

  // pesan user
  ITEM_APPROVED: "Selamat Laporan Anda Disetujui",
  ITEM_REJECTED: "Sayang Sekali Laporan Anda Ditolak",
  DONATION_SUCCESS: "Ada Donasi Baru",
  NEW_COMMENT: "Ada Komentar Baru",
  NEW_REPORT: "Ada Laporan Baru",
  REPORT_IS_DELETED_BY_ADMIN: "Laporan Anda telah dihapus oleh Admin",
  CLAIM_CREATED: "Ada Pengajuan Baru",
  CLAIM_APPROVED: "Selamat Pengajuan Anda Disetujui",
  CLAIM_REJECTED: "Sayang Sekali Pengajuan Anda Ditolak",
  SUBJECT_CLAIM_APPROVED: "Selamat, Pengajuan Anda Disetujui",
  SUBJECT_CLAIM_REJECTED: "Sayang Sekali, Pengajuan Anda Ditolak",
  DESCRIPTION_CLAIM_APPROVED:
    "Kami ingin memberikan kabar gembira bahwa pengajuan Anda telah disetujui. Selanjutnya, penemu barang akan segera menghubungi Anda. Harap menunggu.",
  DESCRIPTION_CLAIM_REJECTED:
    "Sayang Sekali, Pengajuan Anda Ditolak. Dengan alasan",
  CLAIM: "Pengajuan",
  REPORT: "Laporan",
  REPORT_APPROVED: "Selamat Laporan Anda Disetujui",
  SUBJECT_REPORT_APPROVED: "Selamat, Laporan Anda Disetujui",
  SUBJECT_REPORT_REJECTED: "Sayang Sekali, Laporan Anda Ditolak",
  DESCRIPTION_REPORT_APPROVED:
    "Kami ingin memberikan kabar gembira bahwa laporan anda telah disetujui.",
  DESCRIPTION_REPORT_REJECTED:
    "Sayang Sekali, Laporan Anda Ditolak. Dengan alasan",
  REPORT_REJECTED: "Sayang Sekali, Laporan Anda Ditolak",
};

module.exports = RES;
