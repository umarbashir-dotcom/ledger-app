# Ledger

A full-stack **MERN Expense Tracker** that helps users manage their personal finances by tracking income and expenses, organizing transactions into categories, setting budgets, and viewing financial summaries. The application includes secure JWT authentication, user-specific data isolation, and a modern, responsive user interface.

## Live Demo

🔗 **Live Application:** https://ledger-app-by-umar.vercel.app/

---

## Features

### Authentication
- User registration
- Secure login
- JWT-based authentication
- Protected routes
- User-specific transaction data
- Password hashing with bcrypt

### Transaction Management
- Add transactions
- Delete transactions
- Income and expense tracking
- Transaction categories
- Transaction history
- Pagination

### Dashboard
- Financial summary cards
- Budget panel
- Category-wise expense overview
- Search transactions
- Filter by category
- Filter by transaction type
- Sort transactions

### User Experience
- Responsive design
- Toast notifications
- Loading states
- Error handling
- Clean and modern UI

---

## Tech Stack

### Frontend
- React
- React Router
- Context API
- useReducer
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## Project Structure

```
ledger/
│
├── frontend/              # React application
│   ├── src/
│   ├── public/
│   └── package.json
│
├── src/                   # Express backend
├── package.json
├── .env
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/umarbashir-dotcom/ledger-app.git
```


### Install backend dependencies

```bash
npm install
```

---

### Install frontend dependencies

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a `.env` file in the backend root.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

JWT_EXPIRE=30d
```

Create a `.env` file inside the `frontend` directory.

```env
VITE_API_URL=YOUR_BACKEND_API_URL/api/v1/transactions

VITE_USER_API=YOUR_BACKEND_API_URL/api/v1/users
```

---

## Running the Project

### Start the backend

```bash
npm run dev
```

### Start the frontend

```bash
cd frontend

npm run dev
```

---

## API Features

### Authentication

- Register user
- Login user
- JWT authentication
- Protected routes

### Transactions

- Get transactions
- Paginated transactions
- Add transaction
- Delete transaction

---

## Learning Highlights

This project helped me gain practical experience with:

- Building a complete MERN application
- REST API development
- MongoDB and Mongoose
- JWT Authentication
- Password hashing
- React Context API
- useReducer for state management
- React Router
- Pagination
- CRUD operations
- Protected routes
- Environment variables
- Full-stack deployment
- Error handling
- Responsive UI design

---

## Future Improvements

- Edit transactions
- User profile
- Password reset
- Dark mode
- Charts and analytics
- Export transactions
- Monthly reports
- Budget notifications

---

## Author

**Umar Bashir**

BS Computer Science

LinkedIn: https://www.linkedin.com/in/umarbasheer

