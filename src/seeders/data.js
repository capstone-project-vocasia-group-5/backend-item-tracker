const users = [
  {
    name: "John Doe",
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    image_url:
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    role: "user",
    phone_number: "081234567890",
    otp: null,
    otp_status: false,
    otp_expires_at: null,
    is_verified: true,
    deleted_at: null,
  },
  {
    name: "Jane Smith",
    username: "jane_smith",
    email: "jane@example.com",
    password: "password123",
    image_url:
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    role: "admin",
    phone_number: "082345678901",
    otp: null,
    otp_status: false,
    otp_expires_at: null,
    is_verified: true,
    deleted_at: null,
  },
  {
    name: "Alice Johnson",
    username: "alice_johnson",
    email: "alice@example.com",
    password: "password123",
    image_url:
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    role: "user",
    phone_number: "083456789012",
    otp: null,
    otp_status: false,
    otp_expires_at: null,
    is_verified: true,
    deleted_at: null,
  },
  {
    name: "Suga Kim",
    username: "suga",
    email: "suga@example.com",
    password: "password123",
    image_url:
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    role: "user",
    phone_number: "083456789012",
    otp: null,
    otp_status: false,
    otp_expires_at: null,
    is_verified: true,
    deleted_at: null,
  },
  {
    name: "Suga Kim",
    username: "agus",
    email: "agus@example.com",
    password: "password123",
    image_url:
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    role: "user",
    phone_number: "083456789012",
    otp: null,
    otp_status: false,
    otp_expires_at: null,
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
    name: "Kucing Hitam",
    description: "Kucingku selalu pake kalung doraemon dan baju merah",
    matched_status: false,
    images: [
      "https://s3-alpha-sig.figma.com/img/a3c4/d7a8/8ae3782c58628580e16637eaf8be662f?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Op3W5GV6R~OZ9wecvWsf8QBZWrEWNVXVSHDpgO9THUqsXfIO8sIEQG0HNiJZ7Jja09vrkj-vnKXmruTy1Ba8KYbOIpkNyQHscGBq3O32Yik36oc5WvFMoIgwPm4mW8ONq~ME2I4V2v8FonO6rmnnTSZgfu7d5h0Z53NuQJ-5YPXYnhqdtKDxIbJd6e55bhK4lhGu8To67LQE1elkmGTLZX0ouelD11GbB-Hk1b0SpNcHLPHJdusZZjuoz0DCnSTQXZBxfKWyA2mIKVMVHJ~482I8kghLCeyQCQ4Z1yGV5V15K~3wS0A6of4r5RJSiWVR4-p8fs6Qr0qW4WLMmAlYQQ__",
    ],
    approved: true,
    type: "lost",
    province: "Jawa Tengah",
    city: "Semarang",
    subdistrict: "Semarang Utara",
    village: "Sidomulyo",
    postal_code: 50123,
    phone_number: "081234567890",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Alat Pembuat Kopi",
    description:
      "Alat pembuat kopi dengan warna merah dan hitam, ditemukan di sekitar cafe kenangan.",
    matched_status: false,
    images: [
      "https://s3-alpha-sig.figma.com/img/fdd8/864c/d924860f9f40c58187c4b7bf94b7eeef?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=k2CzVpUZEdMK8XG84KLTh9~kRmcsEpGWdFlxPWumixQnvqS6ZrowrG~Kld-aHYlvYJD0efYX35UZv7qf-5LSAH0Kc2VdH5kdivi8rGA-6Us-t63oeNDNzCiFaVLhqtU21XSVGlcn5zBvDIJK3ee-fcGFMiagi6N0vBwDT1rIlzy~0YK7heGWB8qd7-GziHo8y4UoF0OfGK8mvbIUKYFE6WkOFavoTpclkThPbDBlWD6aOKAtaOJX9~Y~pRnBrV-veHMOiTIfr0TOBfnBwyrRlycEVOWV1ll0RemMLgxvAtv89dFt3Qz5zAFf83K2sF~fycUlxWGgfzmgyiSMhaH7pQ__",
    ],
    approved: true,
    type: "found",
    province: "Daerah Istimewa Yogyakarta",
    city: "Yogyakarta",
    subdistrict: "Kraton",
    village: "Suryatmajan",
    postal_code: 55211,
    phone_number: "087654321098",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Kamera",
    description: "Kamera Polaroid Canon dengan lensa kit.",
    matched_status: false,
    images: [
      "https://s3-alpha-sig.figma.com/img/1bf8/af8b/241c04ef9d9c3759931704d0586b00a7?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fc5Bg7Qcnl7Un0XumS2kzf2LyS5MxMzftGQyrsNutVj5ahz0zZMv0YQTwsHC7~aB8rHdR6c0~k7fT7vA-zoLF4tVA2B5fJ-NiOeNt2qtuHFSmOhIiuS0H0szwQtovsvmy1v-GqWHBhdYICRbbytqCMr3ZjiAQ-1QzI3ebRBPmZTEtr6KJJOmPnMz0jP-lrFiT3H2GX1o4wlznYwune0ktUayxAuPLWQsT6eyUI5Uz-bupaYzhMBbl1Ql6JQP5ONLdP849c2tCaJNhXXQnMnfq1iO6tGOvWpMepwH3Mkr4UX9hQyXaoGFVjTopfHYza4p9HzmVV2nBrdm02a5ChhWUg__",
    ],
    approved: true,
    type: "lost",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    subdistrict: "Cilandak",
    village: "Pondok Labu",
    postal_code: 12560,
    phone_number: "089876543210",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Laptop Asus ROG",
    description:
      "Laptop Asus ROG dengan keadaan mati total, ditemukan di sekitar parkiran cafe kenangan.",
    matched_status: false,
    images: [
      "https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120814.jpg",
    ],
    approved: true,
    type: "found",
    province: "Jawa Barat",
    city: "Bandung",
    subdistrict: "Cicendo",
    village: "Merdeka",
    postal_code: 40113,
    phone_number: "085172839465",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Motor Custom",
    description: "Motor custom dengan seperti di gambar.",
    matched_status: false,
    images: [
      "https://asset.kompas.com/crops/q4DJHhmXOvuosmTrZ1dhba3ugTE=/0x60:1152x828/1200x800/data/photo/2020/06/24/5ef2f765bacd6.jpeg",
    ],
    approved: true,
    type: "lost",
    province: "Jawa Timur",
    city: "Surabaya",
    subdistrict: "Wonokromo",
    village: "Ngasinan",
    postal_code: 60242,
    phone_number: "082345678901",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Sepatu Gunung ",
    description: "Sepatu Gunung dengan warna hitam dan grey",
    matched_status: false,
    images: [
      "https://s3-alpha-sig.figma.com/img/b242/2ee0/d7af2dd6402f9af662125fd8a2c4d464?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FXvmO0CfkDYNIML2jF1QjMglyW-7shzluZ1yRzShfvc9Zji~OudepdqLuwizWiI8EvYRL4fPPc~I7QM2Fsx~4yvYcLDnbxP0w4PSQyA9EGuJeOEFomgS-DEPIJk0o8qcdQEDfgW1qOtXSBhj8ySMmnUZOi6NwwjWThPsL8h4lv6qYtWRr7Guv5EhnTW~UWuW3G3PYG1PQEA2Ffaf6Ac0W44zyc2EbgEw~5tqsMWIr44UoAm~qLvvBZmZFaZpJFhIxB8YL3~16zilPS5dHh776ETIKvlG96wAEBaODwTfLisOyNrPRthfPB3BBAslaAgr1iHq4pDTGOkhFe~Z0JfD8w__",
    ],
    approved: true,
    type: "lost",
    province: "Bali",
    city: "Denpasar",
    subdistrict: "Denpasar Selatan",
    village: "Renon",
    postal_code: 80226,
    phone_number: "087654321765",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Tas Hitam lewis",
    description: "Tas seperti di gambar, silahkan ajukan",
    matched_status: false,
    images: [
      "https://www.charleskeith.co.id/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-id-products/default/dwd6e015c9/images/hi-res/2024-L7-CK2-80782509-1-J9-1.jpg?sw=504&sh=672",
    ],
    approved: true,
    type: "lost",
    province: "Sumatera Utara",
    city: "Medan",
    subdistrict: "Medan Kota",
    village: "Kota Matsum",
    postal_code: 20236,
    phone_number: "081234987654",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Botol Eiger",
    description: "Botol Eiger dengan warna  hitam",
    matched_status: false,
    images: [
      "https://d1yutv2xslo29o.cloudfront.net/product/variant/photo/910005774_BLACK_1_2a0a.jpg",
    ],
    approved: true,
    type: "found",
    province: "Sulawesi Selatan",
    city: "Makassar",
    subdistrict: "Tamalate",
    village: "Mannuruki",
    postal_code: 90221,
    phone_number: "085789054321",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Helm N824",
    description: "Helm N824 dengan warna hitam",
    matched_status: false,
    images: [
      "https://down-id.img.susercontent.com/file/04fb2c1300bc51bd193e9b918caf3233",
    ],
    approved: true,
    type: "lost",
    province: "Jawa Tengah",
    city: "Semarang",
    subdistrict: "Semarang Utara",
    village: "Sidomulyo",
    postal_code: 50123,
    phone_number: "081234567890",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Hamster Oren",
    description:
      "Hamster Oren dengan wajah imut, plisss kalo ada yang nemu nanti tak kasih imbalan",
    matched_status: false,
    images: [
      "https://png.pngtree.com/thumb_back/fw800/background/20230424/pngtree-hamster-video-images-free-download-image_2556615.jpg",
    ],
    approved: true,
    type: "lost",
    province: "Daerah Istimewa Yogyakarta",
    city: "Yogyakarta",
    subdistrict: "Kraton",
    village: "Suryatmajan",
    postal_code: 55211,
    phone_number: "087654321098",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Kucing Oren",
    description: "Pliss yang liat bisa komentar yaaa",
    matched_status: false,
    images: [
      "https://i.pinimg.com/474x/80/b6/1a/80b61ae53b4dbd1e629471e656240c87.jpg",
    ],
    approved: true,
    type: "lost",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    subdistrict: "Cilandak",
    village: "Pondok Labu",
    postal_code: 12560,
    phone_number: "089876543210",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Kucing Putih Mata Gojo",
    description: "Ini mending dijual atau dikembaliin ya? tolong komen dong",
    matched_status: false,
    images: [
      "https://e0.pxfuel.com/wallpapers/80/733/desktop-wallpaper-animals-macro-kitty-kitten-beautiful-white-cat.jpg",
    ],
    approved: true,
    type: "found",
    province: "Jawa Barat",
    city: "Bandung",
    subdistrict: "Cicendo",
    village: "Merdeka",
    postal_code: 40113,
    phone_number: "085172839465",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Burung Beo",
    description: "Nemu ini di kamar ku, dia masuk lewat jendela",
    matched_status: false,
    images: [
      "https://asset.kompas.com/crops/feBbLW-WhNixFW2K46ZtJ4USqcA=/0x0:1000x667/1200x800/data/photo/2022/10/25/63578895cbbd0.jpg",
    ],
    approved: true,
    type: "found",
    province: "Jawa Timur",
    city: "Surabaya",
    subdistrict: "Wonokromo",
    village: "Ngasinan",
    postal_code: 60242,
    phone_number: "082345678901",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Headset Gaming Hitam ",
    description: "Hilang di perpustakaan ITB",
    matched_status: false,
    images: [
      "https://www.legatomusiccenter.com/wp-content/uploads/thumb-781-scaled.jpg",
    ],
    approved: true,
    type: "lost",
    province: "Bali",
    city: "Denpasar",
    subdistrict: "Denpasar Selatan",
    village: "Renon",
    postal_code: 80226,
    phone_number: "087654321765",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Tas ELFS Gunung",
    description: "Hilang di sekitar gunung gede jalur cianjur",
    matched_status: false,
    images: [
      "https://www.elfs-shop.com/~img/trim_gunung_elfs_35l_backsupport_mc0-e3ecd-3073_10827-t2494_81.webp",
    ],
    approved: true,
    type: "lost",
    province: "Sumatera Utara",
    city: "Medan",
    subdistrict: "Medan Kota",
    village: "Kota Matsum",
    postal_code: 20236,
    phone_number: "081234987654",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Kucing Putih",
    description:
      "Nemu kucing ini di rumah, udah 3 harian. Kalo pemiliknya gak ketemu, mau dijual aja soalnya mukanya ngeselin",
    matched_status: false,
    images: [
      "https://www.rukita.co/stories/wp-content/uploads/2023/10/Kucing_Persia_Flatnose-2021_10_07-10_34_36_7d7e78c999ca11ba390a8a9409a0bfd3-1.webp",
    ],
    approved: true,
    type: "found",
    province: "Sulawesi Selatan",
    city: "Makassar",
    subdistrict: "Tamalate",
    village: "Mannuruki",
    postal_code: 90221,
    phone_number: "085789054321",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Keyboard Mekanik RedDragon",
    description: "Nemu di perpustakaan kota",
    matched_status: false,
    images: [
      "https://glints.com/id/lowongan/wp-content/uploads/2021/12/keychron-k2-product_1400x.jpg",
    ],
    approved: true,
    type: "found",
    province: "Sulawesi Selatan",
    city: "Makassar",
    subdistrict: "Tamalate",
    village: "Mannuruki",
    postal_code: 90221,
    phone_number: "085789054321",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Iphone 13 Pro Max",
    description: "Nemu di laut",
    matched_status: false,
    images: [
      "https://asset.kompas.com/crops/0OX8wzC68_iM8f_bM80A678vKW4=/80x0:899x546/1200x800/data/photo/2022/01/27/61f229818ddbd.jpg",
    ],
    approved: true,
    type: "found",
    province: "Sulawesi Selatan",
    city: "Makassar",
    subdistrict: "Tamalate",
    village: "Mannuruki",
    postal_code: 90221,
    phone_number: "085789054321",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Koper Biru, Kuning dan Merah",
    description: "Ditemukan di bandara suharto",
    matched_status: false,
    images: [
      "https://png.pngtree.com/png-vector/20240205/ourlarge/pngtree-three-colorful-suitcases-with-labels-3d-illustration-png-image_11624042.png",
    ],
    approved: true,
    type: "found",
    province: "Sulawesi Selatan",
    city: "Makassar",
    subdistrict: "Tamalate",
    village: "Mannuruki",
    postal_code: 90221,
    phone_number: "085789054321",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Topi Fullface",
    description: "Nemu di gunung salak",
    matched_status: false,
    images: [
      "https://upload.jaknot.com/2024/05/images/products/cf4580/original/rigai-topi-rimba-outdoor-anti-uv-waterproof-booonie-hat-polyester-yl-a09.jpg",
    ],
    approved: true,
    type: "found",
    province: "Sulawesi Selatan",
    city: "Makassar",
    subdistrict: "Tamalate",
    village: "Mannuruki",
    postal_code: 90221,
    phone_number: "085789054321",
    messages: null,
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
    title: "this is title notification",
    is_read: false,
    deleted_at: null,
  },
  {
    title: "this is title notification",
    is_read: false,
    deleted_at: null,
  },
  {
    title: "this is title notification",
    is_read: false,
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
    name: "Suga Kim",
    email: "suga@gmail.com",
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
    is_approved: null,
    images: [
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
      "https://res.cloudinary.com/dpb2qk5lf/image/upload/v1732515135/Logo/docayrzkio3myinip8ng.png",
    ],
    claim_text: "This item is damaged and needs replacement.",
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
