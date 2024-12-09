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
      "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2021/10/13/2120193204.jpg",
    ],
    approved: true,
    type: "lost",
    province: "Jawa Tengah",
    city: "Kota Tegal",
    subdistrict: "Tegal Barat",
    village: "Kemandungan",
    postal_code: 52111,
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
      "https://astromesin.com/wp-content/uploads/2017/12/MESIN-KOPI-ESPRESSO-GETRA.jpg",
    ],
    approved: true,
    type: "found",
    province: "DI Yogyakarta",
    city: "Kabupaten Bantul",
    subdistrict: "Bantul",
    village: "Bantul",
    postal_code: 55711,
    phone_number: "087654321098",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Kamera",
    description: "Kamera Polaroid Canon dengan lensa kit.",
    matched_status: false,
    images: [
      "https://cdn.antaranews.com/cache/1200x800/2017/09/20170914polaroid.jpg",
    ],
    approved: true,
    type: "lost",
    province: "DI Yogyakarta",
    city: "Kabupaten Bantul",
    subdistrict: "Bantul",
    village: "Bantul",
    postal_code: 55711,
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
    province: "DI Yogyakarta",
    city: "Kabupaten Bantul",
    subdistrict: "Bantul",
    village: "Bantul",
    postal_code: 55711,
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
    province: "DI Yogyakarta",
    city: "Kabupaten Bantul",
    subdistrict: "Bantul",
    village: "Bantul",
    postal_code: 55711,
    phone_number: "082345678901",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Sepatu Gunung ",
    description: "Sepatu Gunung dengan warna hitam dan grey",
    matched_status: false,
    images: ["https://cdn.consina.com/wp-content/uploads/2024/10/SKARDU.jpg"],
    approved: true,
    type: "lost",
    province: "DI Yogyakarta",
    city: "Kabupaten Bantul",
    subdistrict: "Bantul",
    village: "Bantul",
    postal_code: 55711,
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
    province: "DI Yogyakarta",
    city: "Kabupaten Bantul",
    subdistrict: "Bantul",
    village: "Bantul",
    postal_code: 55711,
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
    province: "Jawa Tengah",
    city: "Kota Tegal",
    subdistrict: "Tegal Barat",
    village: "Kemandungan",
    postal_code: 52111,
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
    city: "Kota Tegal",
    subdistrict: "Tegal Barat",
    village: "Kemandungan",
    postal_code: 52111,
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
    province: "Jawa Tengah",
    city: "Kota Tegal",
    subdistrict: "Tegal Barat",
    village: "Kemandungan",
    postal_code: 52111,
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
    city: "Kota Jakarta Barat",
    subdistrict: "Cengkareng",
    village: "Cengkareng Barat",
    postal_code: 11710,
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
    province: "DKI Jakarta",
    city: "Kota Jakarta Barat",
    subdistrict: "Cengkareng",
    village: "Cengkareng Barat",
    postal_code: 11710,
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
    province: "DKI Jakarta",
    city: "Kota Jakarta Barat",
    subdistrict: "Cengkareng",
    village: "Cengkareng Barat",
    postal_code: 11710,
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
    province: "DKI Jakarta",
    city: "Kota Jakarta Barat",
    subdistrict: "Cengkareng",
    village: "Cengkareng Barat",
    postal_code: 11710,
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
    province: "DKI Jakarta",
    city: "Kota Jakarta Barat",
    subdistrict: "Cengkareng",
    village: "Cengkareng Barat",
    postal_code: 11710,
    phone_number: "081234987654",
    messages: null,
    deleted_at: null,
  },
  {
    name: "Kucing Putih",
    description:
      "Nemu kucing ini di rumah, udah 3 harian. Kalo pemiliknya gak ketemu, mau dijual aja soalnya mukanya ngeselin.",
    matched_status: false,
    images: [
      "https://www.rukita.co/stories/wp-content/uploads/2023/10/Kucing_Persia_Flatnose-2021_10_07-10_34_36_7d7e78c999ca11ba390a8a9409a0bfd3-1.webp",
    ],
    approved: true,
    type: "found",
    province: "DKI Jakarta",
    city: "Kota Jakarta Barat",
    subdistrict: "Cengkareng",
    village: "Cengkareng Barat",
    postal_code: 11710,
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
    province: "DKI Jakarta",
    city: "Kota Jakarta Barat",
    subdistrict: "Cengkareng",
    village: "Cengkareng Barat",
    postal_code: 11710,
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
    province: "DKI Jakarta",
    city: "Kota Jakarta Barat",
    subdistrict: "Cengkareng",
    village: "Cengkareng Barat",
    postal_code: 11710,
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
    province: "DKI Jakarta",
    city: "Kota Jakarta Barat",
    subdistrict: "Cengkareng",
    village: "Cengkareng Barat",
    postal_code: 11710,
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
    province: "DKI Jakarta",
    city: "Kota Jakarta Barat",
    subdistrict: "Cengkareng",
    village: "Cengkareng Barat",
    postal_code: 11710,
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
