# Keira backend

This is keira app backend.
It provides authenticaion, handling user and car deletion and email sending

## Table of contents

- [Dependencies](#dependencies)
- [Prerequisites](#prerequisites)
- [Setup](#Setup)
- [Setting up `config.env`](#setting_up_`config.env`)

## Dependencies

- `express`: Web application framework for Node.js.
- `mongoose`: MongoDB object modeling tool.
- `dotenv`: Load environment variables from a file.
- `nodemon`: Utility that automatically restarts the server during development.
- `cookie-parser`: For parsing cookies in HTTP requests.
- `cors`: For handling Cross-Origin Resource Sharing.
- `jsonwebtoken`: For creating and verifying JSON Web Tokens (JWTs).
- `firebase-admin`: Firebase Admin SDK for deleting users.
- `nodemailer`: For sending emails.
- `pug`: Template engine for rendering HTML.
- `validator`: For data validation and used for validating email.
- `html-to-text`: Convert HTML content to plain text.

## Prerequisites

Before you clone and set up this project, make sure you have the following dependencies installed on your system:

- Node.js (v18.16.1)
- Nodemon (v2.0.19)

## Setup

1. Install all packages used in this project by running:

- With yarn:

```
yarn install
```

- With npm:

```
npm install
```

2. Install the Firebase Admin SDK to handle user deletions

```
npm install firebase-admin --save
```

3. Setting up `config.env`

This project uses a `config.env` file to store sensitive information and environment variables. This file is crucial for the proper functioning of the application.

##### Environment Variables

```plaintext
NODE_ENV=development or production
PORT=any_port_number
DATABASE_USERNAME=your_mongoDB_username
DATABASE_PASSWORD=your_mongoDB_password
DATABASE_CONNECTION=your_mongoDB_connection

FIREBASE_ADMIN_FILENAME=your_firebase_admin_information (It's json file)

# Mailtrap Configuration
EMAIL_USERNAME=mailtrap_username
EMAIL_PASSWORD=mailtrap_password
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525

# App Email Configuration
EMAIL_FROM=email where you want to get users emails

# SendGrid Configuration
SENDGRID_USERNAME=sendgrid_username
SENDGRID_PASSWORD=sendgrid_password

# JWT Configuration
JWT_SECRET=any_jwt_secret
JWT_EXPIRES_IN=when_should_jwt_expires (ex: 1d)
```

## Executing program

- To run the program for development:

```
npm start
```

- To run the program for production:

```
npm run start:prod
```
