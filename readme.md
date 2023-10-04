# Keira backend

This is keira backend.
It provides authenticaion, email sending, user and car deletion

## Getting Started

### Dependencies

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

### Prerequisites

Before you clone and set up this project, make sure you have the following dependencies installed on your system:

- Node.js (v18.16.1)
- Nodemon (v2.0.19)

### Installing

- npm install firebase-admin --save

### Setting up "config.env"

This project uses a `config.env` file to store sensitive information and environment variables. This file is crucial for the proper functioning of the application.

#### Environment Variables

NODE_ENV=development or production
PORT=any_port_number
DATABASE_USERNAME=your_mongoDB_username
DATABASE_PASSWORD=your_mongoDB_password
DATABASE_CONNECTION=your_mongoDB_connection

FIREBASE_ADMIN_FILENAME=your_firebase_admin_information (It's json file)

##### This information is provided by mailtrap in order to test the email sending functionality and having a look at the emails

EMAIL_USERNAME=mailtrap_username
EMAIL_PASSWORD=mailtrap_password
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525

##### This should be replaced with the app email

EMAIL_FROM=email where you want to get users emails

##### This information is provided by sendgrid in order to send (REAL) emails to the users

SENDGRID_USERNAME=sandgrid_username
SENDGRID_PASSWORD=sandgrid_password

##### This information is for the JWT token needed for autherization. Only the admin can call the protected routes (delete car, send email)

JWT_SECRET=any_jwt_secret
JWT_EXPIRES_IN= when_should_jwt_expires (ex: 1d)

### Executing program

- How to run the program for development:

```
npm start
```

- How to run the program for production:

```
npm run start:prod
```
