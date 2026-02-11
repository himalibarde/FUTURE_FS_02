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
