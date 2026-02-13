# 📊 Client Lead Management System - Mini CRM

A modern, full-stack Customer Relationship Management (CRM) application built with the MERN stack for managing client leads from website contact forms.

## 🌟 Features

### ✅ **Core Functionality**
- **Complete Lead Management**: Create, Read, Update, Delete (CRUD) operations for leads
- **Lead Status Tracking**: Track leads through their lifecycle - New → Contacted → Qualified → Converted → Lost
- **Priority System**: Organize leads by priority levels - High, Medium, Low
- **Admin Authentication**: Secure JWT-based login system for authorized access
- **Real-time Dashboard**: Live statistics showing total leads, new leads, contacted, and converted counts
- **Notes & Follow-ups**: Add detailed notes and schedule follow-up dates for each lead
- **Multiple Lead Sources**: Track where leads come from - Website, Referral, Social Media, Email Campaign, Cold Call, Events, and more

### 🎨 **User Interface**
- Modern gradient-based design with purple/blue color scheme
- Fully responsive layout (works perfectly on mobile, tablet, and desktop)
- Interactive data tables with sorting capabilities
- Smooth loading states and animations
- Color-coded status badges for quick visual identification
- Priority indicators for easy lead prioritization
- Clean, professional styling with attention to detail

### 🔒 **Security Features**
- JWT (JSON Web Token) authentication
- Password hashing using bcrypt
- Protected API routes
- Secure admin-only access to sensitive operations
- Token-based session management

## 🛠️ Tech Stack

This project is built using the **MERN stack** with modern web development tools and libraries:

**Frontend Technologies:**
- **HTML5** - Semantic markup language for structuring the web application
- **CSS3** - Custom styling with modern features including gradients, flexbox, grid, and animations for a polished, responsive design
- **JavaScript (ES6+)** - Core programming language for frontend logic, DOM manipulation, and interactive features
- **React.js (v18)** - A powerful JavaScript library for building dynamic and interactive user interfaces with component-based architecture
- **React Router DOM (v6)** - Handles client-side routing and navigation between different pages without page reloads
- **Axios** - Promise-based HTTP client for making API requests to the backend server

**Backend Technologies:**
- **Node.js** - JavaScript runtime environment that enables server-side execution of JavaScript code
- **Express.js** - Fast, minimalist web framework for Node.js that handles routing, middleware, and HTTP requests
- **JavaScript (ES6+)** - Server-side programming language for business logic, API endpoints, and data processing
- **Mongoose** - Elegant MongoDB object modeling (ODM) library that provides schema-based solution for modeling application data

**Database:**
- **MongoDB** - NoSQL document-based database offering flexibility and scalability for storing lead and admin data

**Authentication & Security:**
- **JWT (JSON Web Tokens)** - Industry-standard token-based authentication mechanism for secure user sessions
- **bcrypt** - Robust password hashing library that securely encrypts passwords before storing them in the database

**Development Tools:**
- **npm** - Package manager for installing and managing project dependencies
- **nodemon** - Development utility that automatically restarts the server when file changes are detected

---

## 📁 Project Structure

```
simple-crm/
│
├── backend/                      # Backend Node.js application
│   ├── models/                   # Database models
│   │   ├── Lead.js              # Lead schema with validation
│   │   └── Admin.js             # Admin user schema
│   ├── routes/                   # API route handlers
│   │   ├── leadRoutes.js        # CRUD endpoints for leads
│   │   └── authRoutes.js        # Authentication endpoints
│   ├── middleware/               # Custom middleware
│   │   └── auth.js              # JWT verification middleware
│   ├── server.js                # Express server configuration
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables (not in repo)
│
└── frontend/                     # Frontend React application
    ├── public/                   # Static files
    ├── src/
    │   ├── components/          # React components
    │   │   ├── Login.js        # Login page with authentication
    │   │   ├── Dashboard.js    # Main dashboard with stats & table
    │   │   ├── AddLead.js      # Form to add new leads
    │   │   └── EditLead.js     # Form to edit existing leads
    │   ├── App.js              # Main app with routing logic
    │   ├── App.css             # Global styles and component styling
    │   └── index.js            # React entry point
    └── package.json            # Frontend dependencies
```


## 🚀 Installation & Setup

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas account** (free) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/simple-crm.git
cd simple-crm
```

### Step 2: Backend Setup

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
Create a `.env` file in the backend folder and add:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/crm-database?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

4. **Configure MongoDB Atlas:**
   - Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a database user with username and password
   - Whitelist your IP address (or allow access from anywhere: 0.0.0.0/0)
   - Get your connection string and replace the `MONGO_URI` in `.env`

5. **Start the backend server:**
```bash
npm run dev
```
Backend should run on `http://localhost:5000`

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected Successfully
```

### Step 3: Frontend Setup

1. **Open new terminal and navigate to frontend:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```
Frontend should open automatically at `http://localhost:3000`

### Step 4: Create Admin Account

You need to register an admin account before you can login.

**Using Postman or any API client:**
```
POST http://localhost:5000/api/auth/register

Body (JSON):
{
  "username": "admin",
  "password": "1234",
  "email": "admin@crm.com"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Admin registered successfully"
}
```

### Step 5: Login & Start Using

1. Navigate to `http://localhost:3000`
2. Login with:
   - **Username:** `admin`
   - **Password:** `1234`
3. You're in! 🎉

## 👨‍💻 **Author**

**Himali Barde**

- GitHub: https://github.com/himalibarde
- LinkedIn: www.linkedin.com/in/himali-barde-5b4b1a34a
- Email: himalibarde859@gmail.com

