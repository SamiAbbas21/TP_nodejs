# TP Node.js API

This project implements a simple REST API with user authentication and role based access control.

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file based on `.env.example` and define `MONGODB_URI` and `JWT_SECRET`.

Start the server:

```bash
npm start
```

The API exposes the following main routes:

- `POST /api/auth/signup` – create a user. Only an authenticated admin can assign the `admin` or `moderator` roles.
- `POST /api/auth/login` – authenticate and receive a JWT.
- Routes under `/api/users` are protected and require an admin token to manage users.
