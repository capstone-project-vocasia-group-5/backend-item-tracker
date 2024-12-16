<p align="center">
<img src="https://res.cloudinary.com/dpb2qk5lf/image/upload/v1733927187/Logo/wptmbp6jm8jivetu9otb.svg" width="350" alt="Logo" />
</p>

<p align="center">
  <b>Item Tracker</b><br>
  Final Project Capstone Vocasia<br>
  <a href="https://sukisushi.works/">Explore the docs Open API</a> 
  <br><br>
</p>

# About Project

<p align="justify">
Item Tracker is a digital platform for reporting and tracking lost items. In this application, users will first register and log in. After logging in, users can report lost or found items by uploading details and photos of the items. Users can interact through the comments feature to share additional information. The system will allow searches and filter reports based on category, location, and time. The admin will play a role in verifying reports and assisting the communication process between the owner of the lost item and the finder. This platform is designed to provide a comprehensive solution to help people find lost items through a safe, transparent, and user-friendly system.
</p>

### Features available in this project:

| Feature                 | Method | Users | Admin |
| ----------------------- | ------ | ----- | ----- |
| USERS FEATURE           |
| Register                | POST   | Yes   | No    |
| Login                   | POST   | Yes   | Yes   |
| Reset Password          | POST   | Yes   | Yes   |
| Send OTP                | POST   | Yes   | Yes   |
| Verify OTP              | POST   | Yes   | Yes   |
| Get All Categories      | GET    | Yes   | Yes   |
| Create Categories       | POST   | No    | Yes   |
| Update Categories       | PUT    | No    | Yes   |
| Delete Categories       | DELETE | No    | Yes   |
| Get All Claims          | GET    | Yes   | No    |
| Get Detail Claims       | GET    | Yes   | No    |
| Create Claims           | PUT    | Yes   | No    |
| Approve Claims          | PUT    | Yes   | No    |
| Reject Claims           | PUT    | Yes   | No    |
| Delete Claims           | PUT    | Yes   | No    |
| Get Detail User         | GET    | Yes   | No    |
| Get All Users           | GET    | No    | Yes   |
| Update User             | PATCH  | Yes   | No    |
| Create Comments         | POST   | Yes   | No    |
| Update Comments         | PUT    | Yes   | No    |
| Delete Comments         | DELETE | Yes   | No    |
| Get Comments By ID      | GET    | Yes   | No    |
| Get Comment By ItemID   | GET    | Yes   | No    |
| Get Total Item Comments | GET    | Yes   | No    |
| Create Items            | POST   | Yes   | No    |
| Update Items            | PATCH  | Yes   | No    |
| Delete Items            | DELETE | Yes   | Yes   |
| Get All Items           | GET    | Yes   | Yes   |
| Get Item By ID          | GET    | Yes   | Yes   |
| Approve Items           | PATCH  | No    | Yes   |
| Reject Items            | PATCH  | No    | Yes   |
| Reject Items            | PATCH  | No    | Yes   |
| Reject Items            | PATCH  | No    | Yes   |
| Reject Items            | PATCH  | No    | Yes   |
| Reject Items            | PATCH  | No    | Yes   |
| Reject Items            | PATCH  | No    | Yes   |
| Reject Items            | PATCH  | No    | Yes   |

# Built With

- <a href="https://github.com/golang">Golang</a>
- <a href="https://github.com/labstack/echo">Echo</a>
- <a href="https://github.com/go-gorm/gorm">Gorm</a>
- <a href="https://github.com/mysql">MySql</a>

# Getting Started

## How to Use

Clone the project

```bash
  git clone https://github.com/Alterra-Greeve/backend-capstone.git
```

Install required dependencies

```bash
  go mod tidy
```

Setting Environmental Variable on `.env` file

```bash
  DB_HOST=
  DB_PORT=
  DB_USER=
  DB_PASS=
  DB_NAME=

  SMTP_USER=
  SMTP_PASS=
  SMTP_HOST=
  SMTP_PORT=

  JWT_SECRET=

  PROJECT_ID=
  BUCKET_NAME=
  GOOGLE_APPLICATION_CREDENTIALS=

  MIDTRANS_CLIENT_KEY=
  MIDTRANS_SERVER_KEY=
```

Run `main.go` file

```bash
go run main.go
```

Run the endpoints as in the swagger documentation

# System Diagram and Architecture

## ERD

<div style="border: 1px solid #000; padding: 10px; display: inline-block;">
  <img src="https://github.com/Alterra-Greeve/backend-capstone/assets/133726246/c6ddfcd2-2c8c-4d1e-a7c8-2587ec42adf6" alt="ERD_Capstone drawio">
</div>

## HLA

![HLA Capstone (3)](https://github.com/Alterra-Greeve/backend-capstone/assets/133726246/e6b4627a-7bfc-40c9-bd09-7b33ee583a22)

# Contact

Link Project: <br>
<a href="https://github.com/Alterra-Greeve">
<img src="https://img.shields.io/badge/Greeve-black?logo=github" alt="GitHub Badge">
</a>
<br>
API Documentation: <br>
<a href="https://api.greeve.store/#/">
<img src="https://img.shields.io/badge/Greeve-darkgreen?logo=swagger&logoColor=dark" alt="Swagger Badge">
</a>

## Contributor

**Nur Faid Praseto**
<br>
[![Nur Faid Prasetyo - LinkedIn](https://img.shields.io/badge/Nur_Faid_Prasetyo-blue?logo=linkedin)](https://www.linkedin.com/in/kzquandary)
[![Nur Faid Prasetyo - GitHub](https://img.shields.io/badge/Nur_Faid_Prasetyo-black?logo=github)](https://github.com/kzquandary)

**Chandra Wahyu Rafialdi**
<br>
[![Chandra Wahyu Rafialdi - LinkedIn](https://img.shields.io/badge/Chandra_Wahyu_Rafialdi-blue?logo=linkedin)](https://www.linkedin.com/in/chandra-wahyu-r-8875b3297/)
[![Chandra Wahyu Rafialdi - GitHub](https://img.shields.io/badge/Chandra_Wahyu_Rafialdi-black?logo=github)](https://github.com/ChandraWahyuR)
