# ⚡ DevPulse API

### Report issues, track feature requests, and manage development workflows through a role-based REST API.

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Main Features](#-main-features)
- [User Roles and Permissions](#-user-roles-and-permissions)
- [API Endpoints](#-api-endpoints)
- [Filtering and Sorting](#-filtering-and-sorting)
- [Technologies Used](#️-technologies-used)
- [Dependencies](#-dependencies)
- [Project Structure](#-project-structure)
- [Run Locally](#️-run-locally)
- [Available Scripts](#-available-scripts)
- [Relevant Links](#-relevant-links)
- [Author](#-author)

---

## 📖 About the Project

**DevPulse API** is a backend application for managing technical issues and feature requests.

Users can create accounts, log in securely, and submit issues as either bugs or feature requests. Each issue stores its reporter information, type, status, creation time, and update time.

The application uses JWT-based authentication and role-based authorization. Contributors and maintainers have different permissions when creating, updating, and deleting issues.

The project follows a modular backend structure with separate routes, controllers, services, interfaces, middleware, database configuration, and utility functions.

---

## ✨ Main Features

- User registration and login
- Password hashing before storing user credentials
- JWT-based authentication
- Role-based route protection
- Create bug reports and feature requests
- Retrieve all issues
- Retrieve a single issue by ID
- Filter issues by type
- Filter issues by status
- Sort issues by newest or oldest
- Update issue information using partial updates
- Restrict contributors to updating their own open issues
- Restrict issue-status updates to maintainers
- Restrict issue deletion to maintainers
- Include reporter details with issue responses
- Store application data in PostgreSQL
- Perform database operations with parameterized raw SQL queries
- Build TypeScript source code for production
- Support deployment through Vercel configuration

---

## 👥 User Roles and Permissions

### Contributor

A contributor can:

- Create bugs and feature requests
- View all issues
- View a single issue
- Update an issue only when:
  - the contributor created the issue
  - the issue is still open
- Update the title, description, or issue type
- Not update the issue status
- Not delete issues

### Maintainer

A maintainer can:

- Create bugs and feature requests
- View all issues
- View a single issue
- Update any issue
- Update issue status
- Delete issues

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Public | Create a new user account |
| `POST` | `/api/auth/login` | Public | Log in and receive a JWT access token |

### Issues

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/issues` | Contributor, Maintainer | Create a new issue |
| `GET` | `/api/issues` | Public | Retrieve all issues |
| `GET` | `/api/issues/:id` | Public | Retrieve one issue by ID |
| `PATCH` | `/api/issues/:id` | Contributor, Maintainer | Update an issue according to role permissions |
| `DELETE` | `/api/issues/:id` | Maintainer | Delete an issue |

### Health Check

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Check whether the API is running |

---

## 🔎 Filtering and Sorting

The `GET /api/issues` endpoint supports query parameters.

### Filter by issue type

```text
/api/issues?type=bug
```

```text
/api/issues?type=feature_request
```

Available types:

```text
bug
feature_request
```

### Filter by status

```text
/api/issues?status=open
```

```text
/api/issues?status=in_progress
```

```text
/api/issues?status=resolved
```

Available statuses:

```text
open
in_progress
resolved
```

### Sort issues

```text
/api/issues?sort=newest
```

```text
/api/issues?sort=oldest
```

The default sorting order is:

```text
newest
```

### Combine filters

```text
/api/issues?type=bug&status=open&sort=newest
```

---

## 📝 Example Request Bodies

### Create an account

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword",
  "role": "contributor"
}
```

Available roles:

```text
contributor
maintainer
```

When no role is provided, the default role is `contributor`.

### Log in

```json
{
  "email": "john@example.com",
  "password": "securePassword"
}
```

### Create an issue

```json
{
  "title": "Login button is not working",
  "description": "The login button does not respond after entering valid credentials.",
  "type": "bug"
}
```

### Create a feature request

```json
{
  "title": "Add dark mode",
  "description": "Users should be able to switch between light and dark themes.",
  "type": "feature_request"
}
```

### Update an issue

```json
{
  "title": "Updated issue title",
  "description": "Updated issue description",
  "type": "bug"
}
```

### Update issue status as a maintainer

```json
{
  "status": "in_progress"
}
```

For protected routes, send the access token in the request authorization header:

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## 🛠️ Technologies Used

- **Node.js** — runs the backend application
- **Express.js 5** — handles routes, middleware, requests, and responses
- **TypeScript** — adds static typing to the codebase
- **PostgreSQL** — stores users and issue data
- **Raw SQL** — performs database queries and mutations
- **JSON Web Token** — authenticates users and protects routes
- **bcrypt** — hashes and verifies user passwords
- **CORS** — controls cross-origin access
- **dotenv** — loads application configuration
- **tsx** — runs TypeScript during development
- **tsup** — bundles the application for production
- **Vercel** — provides deployment configuration

---

## 📦 Dependencies

### Main Dependencies

- `express` — creates the API server and routes
- `pg` — connects Node.js to PostgreSQL
- `bcrypt` — hashes and compares passwords
- `jsonwebtoken` — creates and verifies JWT access tokens
- `cors` — configures cross-origin requests
- `dotenv` — loads configuration values
- `tsup` — bundles the TypeScript application
- `@types/cors` — provides TypeScript definitions for CORS

### Development Dependencies

- `typescript` — provides TypeScript support
- `tsx` — runs and watches TypeScript files
- `@types/node` — provides Node.js type definitions
- `@types/express` — provides Express type definitions
- `@types/pg` — provides PostgreSQL type definitions
- `@types/bcrypt` — provides bcrypt type definitions
- `@types/jsonwebtoken` — provides JSON Web Token type definitions

---

## 📂 Project Structure

```text
devpulse/
├── src/
│   ├── config/
│   ├── db/
│   ├── middlewares/
│   ├── modules/
│   │   ├── authentication/
│   │   │   ├── authenticatio.route.ts
│   │   │   ├── authentication.controller.ts
│   │   │   ├── authentication.service.ts
│   │   │   └── authetication.interface.ts
│   │   └── issues/
│   │       ├── issue.interface.ts
│   │       ├── issues.controller.ts
│   │       ├── issues.route.ts
│   │       └── issues.service.ts
│   ├── types/
│   ├── utility/
│   ├── app.ts
│   └── server.ts
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsup.config.ts
├── vercel.json
└── README.md
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

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the application

Add the required local configuration values used by the project, including:

- server port
- PostgreSQL connection URL
- JWT secret

### 5. Start the development server

```bash
npm run dev
```

The API health-check route will be available at:

```text
http://localhost:5000/
```

The actual port depends on the value configured in the project.

---

## 📜 Available Scripts

### Start the development server

```bash
npm run dev
```

Runs:

```text
tsx watch src/server.ts
```

### Build the project

```bash
npm run build
```

Bundles the TypeScript application into the `dist` directory using `tsup`.

### Start the production build

```bash
npm start
```

Runs:

```text
node dist/server.js
```

Build the project before starting it in production:

```bash
npm run build
npm start
```

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
