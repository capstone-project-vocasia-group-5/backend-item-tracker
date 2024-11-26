const users = [
  {
    name: "John Doe",
    username: "john_doe",
    email: "john@example.com",
    password: "$2y$12$f.X.as7ucrEKQOL9LSYE8ODO62s516djb9xO/xfveaJ0DEzb1lA2O",
    image_url:
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    role: "user",
    phone_number: "081234567890",
    otp: null,
    is_verified: true,
    deleted_at: null,
  },
  {
    name: "Jane Smith",
    username: "jane_smith",
    email: "jane@example.com",
    password: "$2y$12$f.X.as7ucrEKQOL9LSYE8ODO62s516djb9xO/xfveaJ0DEzb1lA2O",
    image_url:
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    role: "admin",
    phone_number: "082345678901",
    otp: null,
    is_verified: true,
    deleted_at: null,
  },
  {
    name: "Alice Johnson",
    username: "alice_johnson",
    email: "alice@example.com",
    password: "$2y$12$f.X.as7ucrEKQOL9LSYE8ODO62s516djb9xO/xfveaJ0DEzb1lA2O",
    image_url:
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    role: "user",
    phone_number: "083456789012",
    otp: null,
    is_verified: true,
    deleted_at: null,
  },
];

const categories = [
  {
    name: "Electronics",
    deleted_at: null,
  },
  {
    name: "Fashion",
    deleted_at: null,
  },
  {
    name: "Home & Garden",
    deleted_at: null,
  },
];

const items = [
  {
    name: "Lost Wallet",
    description: "A black wallet with identification cards and some cash.",
    matched_status: false,
    images: [
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    ],
    approved: false,
    type: "lost",
    province: "Central Java",
    city: "Semarang",
    subdistrict: "Semarang Utara",
    village: "Sidomulyo",
    postal_code: 50123,
    phone_number: "081234567890",
    rejection_reason: null,
    deleted_at: null,
  },
  {
    name: "Found Bicycle",
    description: "A red bicycle found near the park.",
    matched_status: false,
    images: [
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    ],
    approved: true,
    type: "found",
    province: "Yogyakarta",
    city: "Yogyakarta",
    subdistrict: "Kraton",
    village: "Suryatmajan",
    postal_code: 55211,
    phone_number: "087654321098",
    rejection_reason: null,
    deleted_at: null,
  },
  {
    name: "Lost Smartphone",
    description:
      "A black smartphone, possibly an iPhone, left on the coffee shop table.",
    matched_status: false,
    images: [
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    ],
    approved: false,
    type: "found",
    province: "Jakarta",
    city: "Jakarta Selatan",
    subdistrict: "Cilandak",
    village: "Pondok Labu",
    postal_code: 12560,
    phone_number: "089876543210",
    rejection_reason: null,
    deleted_at: null,
  },
];

const comments = [
  {
    comment_text:
      "I found this item, but it has no identification. Hope someone claims it soon!",
    deleted_at: null,
  },
  {
    comment_text:
      "This item belongs to me! I lost it last week. Please contact me.",
    deleted_at: null,
  },
  {
    comment_text:
      "Found this item but no contact information. Let me know if you recognize it.",
    deleted_at: null,
  },
];

const notifications = [
  {
    is_read: true,
    deleted_at: null,
  },
  {
    is_read: true,
    deleted_at: null,
  },
];

const donations = [
  {
    user_id: null,
    name: "John Doe",
    email: "johndoe@example.com",
    amount: 50000,
    is_anonymous: false,
    status: "pending",
    deleted_at: null,
  },
  {
    user_id: null,
    name: "Jane Smith",
    email: "janesmith@example.com",
    amount: 150000,
    is_anonymous: false,
    status: "success",
    deleted_at: null,
  },
  {
    user_id: null,
    name: "Anonymous",
    email: null,
    amount: 20000,
    is_anonymous: true,
    status: "success",
    deleted_at: null,
  },
  {
    user_id: null,
    name: "Alice Brown",
    email: "alicebrown@example.com",
    amount: 30000,
    is_anonymous: false,
    status: "failed",
    deleted_at: null,
  },
];

const items_categories = [
  {
    item_id: "605c72ef1532071f244db831",
    category_id: "605c72ef1532071f244db841",
    deleted_at: null,
  },
  {
    item_id: "605c72ef1532071f244db832",
    category_id: "605c72ef1532071f244db842",
    deleted_at: null,
  },
  {
    item_id: "605c72ef1532071f244db833",
    category_id: "605c72ef1532071f244db843",
    deleted_at: null,
  },
  {
    item_id: "605c72ef1532071f244db834",
    category_id: "605c72ef1532071f244db844",
    deleted_at: null,
  },
];

const claims = [
  {
    is_approved: false,
    images: [
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    ],
    claim_text: "This item is damaged and needs replacement.",
    deleted_at: null,
  },
  {
    is_approved: true,
    images: [
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    ],
    claim_text: "Item was not as described and is being returned.",
    deleted_at: null,
  },
];

module.exports = {
  users,
  categories,
  items,
  donations,
  items_categories,
  claims,
  comments,
  notifications,
};
