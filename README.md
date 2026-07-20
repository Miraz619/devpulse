# ⚡ DevPulse API

### Track technical issues, manage feature requests, and keep development teams organized.

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Main Features](#-main-features)
- [User Roles](#-user-roles)
- [Technologies Used](#️-technologies-used)
- [Dependencies](#-dependencies)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Run Locally](#️-run-locally)
- [Available Scripts](#-available-scripts)
- [Relevant Links](#-relevant-links)
- [Author](#-author)

---

## 📖 About the Project

**DevPulse API** is a backend application for managing internal technical issues and feature requests.

Users can create accounts, log in securely, report technical problems, submit feature requests, and track the status of their submissions.

The application uses role-based authorization to control access to different operations. Contributors can create and manage issues according to their permissions, while maintainers have greater control over reviewing, updating, and deleting issues.

This project demonstrates backend concepts such as REST API development, authentication, authorization, PostgreSQL database operations, raw SQL queries, validation, and structured error handling.

---

## ✨ Main Features

- Register a new user account
- Log in with email and password
- Generate JWT access tokens
- Secure passwords using hashing
- Access protected routes through authentication
- Apply role-based authorization
- Create technical issues and feature requests
- View available issues
- Update issue information
- Update issue status and priority
- Delete issues based on user permissions
- Store users and issues in PostgreSQL
- Perform database operations using raw SQL
- Handle errors with appropriate HTTP status codes
- Organize backend code into structured modules

---

## 👥 User Roles

### Contributor

A contributor can:

- Create technical issues or feature requests
- View available issues
- Manage permitted issue information
- Track submitted issues

### Maintainer

A maintainer can:

- View all available issues
- Review reported issues
- Update issue details and status
- Manage issues with elevated permissions
- Delete issues when necessary

---

## 🛠️ Technologies Used

- **Node.js** — runs the backend application
- **Express.js** — handles routes, requests, responses, and middleware
- **TypeScript** — provides static typing and safer backend development
- **PostgreSQL** — stores users, issues, and other application data
- **Raw SQL** — performs database queries and operations
- **JSON Web Token** — manages authentication and protected routes
- **bcrypt** — hashes and compares user passwords
- **CORS** — controls access from client applications
- **dotenv** — loads environment variables
- **HTTP Status** — provides readable HTTP status codes

---

## 📦 Dependencies

### Main Dependencies

- `express` — creates the API server and routes
- `pg` — connects the application to PostgreSQL
- `jsonwebtoken` — creates and verifies JWT tokens
- `bcrypt` — hashes and verifies passwords
- `cors` — configures cross-origin access
- `dotenv` — loads environment variables
- `http-status` — provides standard HTTP status codes

### Development Dependencies

- `typescript` — adds TypeScript support
- `tsx` — runs TypeScript files during development
- `@types/express` — provides Express TypeScript types
- `@types/node` — provides Node.js TypeScript types
- `@types/jsonwebtoken` — provides JWT TypeScript types
- `@types/bcrypt` — provides bcrypt TypeScript types
- `@types/cors` — provides CORS TypeScript types
- `@types/pg` — provides PostgreSQL TypeScript types

> Check your `package.json` and remove or add dependencies here so the list exactly matches the project.

---

## 📂 Project Structure

```text
devpulse/
├── src/
│   ├── config/
│   ├── middlewares/
│   ├── modules/
│   │   ├── auth/
│   │   ├── user/
│   │   └── issue/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

> Update this structure if your actual folders use different names.

---

## 🔐 Environment Variables

Create a `.env` file in the project root and add the required environment variables.

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_ACCESS_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=7d
```

Your variable names must match the names used in your project configuration.

Never upload your real `.env` file to GitHub.

You can also create a safe `.env.example` file:

```env
PORT=

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=
```

---

## ⚙️ Run Locally

Follow these steps to run the project on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/Miraz619/devpulse.git
```

### 2. Go to the project directory

```bash
cd devpulse
```

### 3. Install the dependencies

```bash
npm install
```

### 4. Create the environment file

Create a `.env` file in the root directory and add the required configuration values.

### 5. Set up the PostgreSQL database

Create a PostgreSQL database and add its connection URL to:

```env
DATABASE_URL=your_postgresql_connection_string
```

Run the required SQL queries or database setup files used by the project to create its tables.

### 6. Start the development server

```bash
npm run dev
```

The server will usually run at:

```text
http://localhost:5000
```

---

## 📜 Available Scripts

Start the development server:

```bash
npm run dev
```

Compile the TypeScript project:

```bash
npm run build
```

Run the compiled application:

```bash
npm start
```

> Keep only the scripts that actually exist in your `package.json`.

---

## 🔗 Relevant Links

- **GitHub Repository:** [View Source Code](https://github.com/Miraz619/devpulse)
- **Portfolio:** [Miraz Hossain](https://portfolio-three-jade-fsw34ad3tn.vercel.app/)
- **GitHub Profile:** [Miraz619](https://github.com/Miraz619)
- **LinkedIn:** [Miraz Hossain](https://www.linkedin.com/in/miraz-hossain-4839b1340/)

---

## 👨‍💻 Author

**Miraz Hossain**

- **Email:** [mirazh2399@gmail.com](mailto:mirazh2399@gmail.com)
- **Portfolio:** [View Portfolio](https://portfolio-three-jade-fsw34ad3tn.vercel.app/)
- **LinkedIn:** [Connect on LinkedIn](https://www.linkedin.com/in/miraz-hossain-4839b1340/)
