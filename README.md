<p align="center">
<svg width="200px" height="200px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.17004 7.43994L12 12.5499L20.77 7.46991" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 21.6099V12.5399" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.61 12.83V9.17C21.61 7.79 20.62 6.11002 19.41 5.44002L14.07 2.48C12.93 1.84 11.07 1.84 9.92999 2.48L4.59 5.44002C3.38 6.11002 2.39001 7.79 2.39001 9.17V14.83C2.39001 16.21 3.38 17.89 4.59 18.56L9.92999 21.52C10.5 21.84 11.25 22 12 22C12.75 22 13.5 21.84 14.07 21.52" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.2 21.4C20.9673 21.4 22.4 19.9673 22.4 18.2C22.4 16.4327 20.9673 15 19.2 15C17.4327 15 16 16.4327 16 18.2C16 19.9673 17.4327 21.4 19.2 21.4Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23 22L22 21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</p>

<p align="center">
  <b>Item Tracker</b><br>
  Final Project Capstone Vocasia<br>
  <a href="https://api-itemtracker.vocasia-fsjs-c.fun/">Explore the docs Open API</a> 
  <br><br>
</p>

# About Project

<p align="justify">
Item Tracker is a digital platform for reporting and tracking lost items. In this application, users will first register and log in. After logging in, users can report lost or found items by uploading details and photos of the items. Users can interact through the comments feature to share additional information. The system will allow searches and filter reports based on category, location, and time. The admin will play a role in verifying reports and assisting the communication process between the owner of the lost item and the finder. This platform is designed to provide a comprehensive solution to help people find lost items through a safe, transparent, and user-friendly system.
</p>

### Features available in this project:

| Feature                      | Method | Users | Admin |
| ---------------------------- | ------ | ----- | ----- |
| USERS FEATURE                |
| Register                     | POST   | Yes   | No    |
| Login                        | POST   | Yes   | Yes   |
| Reset Password               | POST   | Yes   | Yes   |
| Send OTP                     | POST   | Yes   | Yes   |
| Verify OTP                   | POST   | Yes   | Yes   |
| Get All Categories           | GET    | Yes   | Yes   |
| Create Categories            | POST   | No    | Yes   |
| Update Categories            | PUT    | No    | Yes   |
| Delete Categories            | DELETE | No    | Yes   |
| Get All Claims               | GET    | Yes   | No    |
| Get Detail Claims            | GET    | Yes   | No    |
| Create Claims                | PUT    | Yes   | No    |
| Approve Claims               | PUT    | Yes   | No    |
| Reject Claims                | PUT    | Yes   | No    |
| Delete Claims                | PUT    | Yes   | No    |
| Get Detail User              | GET    | Yes   | No    |
| Get All Users                | GET    | No    | Yes   |
| Update User                  | PATCH  | Yes   | No    |
| Delete User                  | DELETE | No    | Yes   |
| Create Comments              | POST   | Yes   | No    |
| Update Comments              | PUT    | Yes   | No    |
| Delete Comments              | DELETE | Yes   | No    |
| Get Comments By ID           | GET    | Yes   | No    |
| Get Comment By ItemID        | GET    | Yes   | No    |
| Get Total Item Comments      | GET    | Yes   | No    |
| Create Items                 | POST   | Yes   | No    |
| Update Items                 | PATCH  | Yes   | No    |
| Delete Items                 | DELETE | Yes   | Yes   |
| Get All Items                | GET    | Yes   | Yes   |
| Get Item By ID               | GET    | Yes   | Yes   |
| Approve Items                | PATCH  | No    | Yes   |
| Reject Items                 | PATCH  | No    | Yes   |
| Get Notification by User     | GET    | Yes   | No    |
| Get Detail Notification      | GET    | Yes   | Yes   |
| Set Notification is Read     | PUT    | Yes   | Yes   |
| Set All Notification is Read | PUT    | Yes   | Yes   |
| Get Notification by Admin    | GET    | No    | Yes   |
| Get Unread Notification      | GET    | Yes   | Yes   |
| Create Donation              | POST   | Yes   | Yes   |
| Midtrans Web Hook            | POST   | Yes   | Yes   |
| Get All Donations            | GET    | Yes   | Yes   |
| Get Total Amount Donations   | GET    | No    | Yes   |
| Send Mail                    | POST   | Yes   | Yes   |
| Get Total Item By Category   | GET    | No    | Yes   |

## 🛠️ Tech Stack

| Feature/Functionality    | Package                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Server-Side Framework    | [Express](https://expressjs.com/)                                                                                                    |
| JavaScript Runtime       | [Node.js](https://nodejs.org/)                                                                                                       |
| Package Management       | [npm](https://www.npmjs.com/)                                                                                                        |
| Environment Variables    | [dotenv](https://www.npmjs.com/package/dotenv)                                                                                       |
| Authentication & Hashing | [bcryptjs](https://www.npmjs.com/package/bcryptjs)                                                                                   |
| JWT Authentication       | [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)                                                                           |
| Data Validation          | [Joi](https://www.npmjs.com/package/joi), [joi-objectid](https://www.npmjs.com/package/joi-objectid)                                 |
| File Upload              | [Multer](https://www.npmjs.com/package/multer)                                                                                       |
| Cloud Storage            | [Cloudinary](https://cloudinary.com/)                                                                                                |
| Database ODM             | [Mongoose](https://mongoosejs.com/)                                                                                                  |
| HTTP Request Logger      | [Morgan](https://www.npmjs.com/package/morgan)                                                                                       |
| HTTP Status Codes        | [http-status-codes](https://www.npmjs.com/package/http-status-codes)                                                                 |
| Cross-Origin Resource    | [CORS](https://www.npmjs.com/package/cors)                                                                                           |
| Payment Gateway          | [midtrans-client](https://www.npmjs.com/package/midtrans-client)                                                                     |
| File System Utilities    | [fs-extra](https://www.npmjs.com/package/fs-extra)                                                                                   |
| Template Engine          | [Mustache](https://www.npmjs.com/package/mustache)                                                                                   |
| Email Service            | [Nodemailer](https://www.npmjs.com/package/nodemailer)                                                                               |
| API Documentation        | [Swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc), [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) |
| Unique ID Generator      | [uuid](https://www.npmjs.com/package/uuid)                                                                                           |
| Development Tool         | [Nodemon](https://www.npmjs.com/package/nodemon)                                                                                     |
| Request Parsing          | [Body-Parser](https://www.npmjs.com/package/body-parser)                                                                             |

# Getting Started

## How to Use

Clone the project

```bash
  git clone https://github.com/capstone-project-vocasia-group-5/backend-item-tracker
```

Install required dependencies

```bash
  npm i
```

Copy `.env.example` file to `.env` file

```bash
  cp .env.example .env
```

Setting Environmental Variable on `.env` file

```bash
PORT=
MONGODB_URI=

JWT_SECRET_KEY=
JWT_EXPIRATION=8h

GMAIL=
PASSWORD=

IS_PRODUCTION=false

# midtrans connection
SERVER_KEY_MIDTRANS=
CLIENT_KEY_MIDTRANS=

# cloudinary connection
CCNAME=
CCAPIKEY=
CCAPISECRET=
CCFOLDER=
```

Run seeders

```bash
npm run seed
```

Run development server

```bash
npm run dev
```

Run workers

```bash
npm run worker
```

Run the endpoints as in the postman documentation

# System Diagram and Architecture

## ERD

<div style="border: 1px solid #000; padding: 10px; display: inline-block;">
  <img src="https://raw.githubusercontent.com/capstone-project-vocasia-group-5/backend-item-tracker/a94dfb1a554abea73c4c61528d44b61bf0426d64/public/assets/ERD_ITEMTRACKER.png?token=GHSAT0AAAAAAC3HMFJAFMW5POJBIMYM6SZOZ3BLA2Q" alt="ERD_Capstone drawio">
</div>

## HLA

![HLA Capstone (3)](https://raw.githubusercontent.com/capstone-project-vocasia-group-5/backend-item-tracker/a94dfb1a554abea73c4c61528d44b61bf0426d64/public/assets/HLA.png?token=GHSAT0AAAAAAC3HMFJAV2ZDWRDLJ6R5ZYAWZ3BLBHA)

# Contact

Link Project: <br>
<a href="https://github.com/capstone-project-vocasia-group-5">
<img src="https://img.shields.io/badge/ItemTracker-black?logo=github" alt="GitHub Badge">
</a>
<br>
API Documentation: <br>
<a href="https://api.greeve.store/#/">
<img src="https://img.shields.io/badge/ItemTracker-purple?logo=swagger&logoColor=white" alt="Postman Badge">
</a>

## Contributor

**Agus Heryanto**
<br>
[![Agus Heryanto - LinkedIn](https://img.shields.io/badge/Agus_Heryanto-blue?logo=linkedin)](https://www.linkedin.com/in/agus-heryanto-b34561284/)
[![Agus Heryanto - GitHub](https://img.shields.io/badge/Agus_Heryanto-black?logo=github)](https://github.com/agusheryanto182)
