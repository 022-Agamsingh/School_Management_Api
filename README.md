# 🏫 School Management System

A full-stack web application for managing schools with geolocation-based search functionality, user authentication, and CRUD operations.

## 🔗 Live Demo

- **Frontend**: [Deploy your frontend to get URL]
- **Backend API**: [https://school-management-api-flame.vercel.app](https://school-management-api-flame.vercel.app)

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [System Flow](#system-flow)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🛠️ Tech Stack

### Frontend

- **React.js** - UI Library
- **Vite** - Build Tool & Dev Server
- **JavaScript (ES6+)** - Programming Language
- **CSS3** - Styling (Inline Styles)
- **HTML5** - Markup
- **Fetch API** - HTTP Client
- **Browser Geolocation API** - Location Services

### Backend

- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - NoSQL Database
- **Mongoose** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication
- **bcrypt** - Password Hashing
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment Variables
- **cookie-parser** - Cookie Handling

### Database

- **MongoDB Atlas** - Cloud Database
- **Mongoose Schema** - Data Modeling

### Deployment

- **Vercel** - Hosting Platform
- **Serverless Functions** - Backend Deployment

### Tools & Libraries

- **Validator** - Data Validation
- **Haversine Formula** - Distance Calculation
- **ESLint** - Code Linting

## ✨ Features

### 🔐 Authentication System

- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Session management with HTTP-only cookies
- Protected routes and middleware

### 🏫 School Management

- Add new schools with geolocation
- View all schools sorted by distance
- Search and filter schools
- Distance calculation from user location
- School details with address information

### 👤 Profile Management

- View user profile information
- Update email and password
- Delete user account
- Account statistics dashboard

### 🌍 Geolocation Features

- Browser-based location detection
- Distance calculation using Haversine formula
- Schools sorted by proximity
- Location-based search functionality

### 📱 User Interface

- Responsive design
- Clean and intuitive interface
- Real-time form validation
- Loading states and error handling
- Interactive navigation

## 🏗️ Architecture

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│                 │       │                 │       │                 │
│    Frontend     │◄─────►│     Backend     │◄─────►│    Database     │
│   (React.js)    │       │   (Express.js)  │       │   (MongoDB)     │
│                 │       │                 │       │                 │
└─────────────────┘       └─────────────────┘       └─────────────────┘
        │                           │                           │
        │                           │                           │
    ┌───▼───┐                   ┌───▼───┐                   ┌───▼───┐
    │ Vite  │                   │ JWT   │                   │ Atlas │
    │ Build │                   │ Auth  │                   │ Cloud │
    └───────┘                   └───────┘                   └───────┘
        │                           │                           │
        │                           │                           │
    ┌───▼───┐                   ┌───▼───┐                   ┌───▼───┐
    │Vercel │                   │Vercel │                   │Network│
    │Deploy │                   │Deploy │                   │Access │
    └───────┘                   └───────┘                   └───────┘
```

## 🔄 System Flow

### User Authentication Flow

```mermaid
graph TD
    A[User Access] --> B{Authenticated?}
    B -->|No| C[Login/Signup Page]
    B -->|Yes| D[Dashboard]
    C --> E[Submit Credentials]
    E --> F[Backend Validation]
    F -->|Valid| G[Generate JWT Token]
    F -->|Invalid| H[Return Error]
    G --> I[Set HTTP-only Cookie]
    I --> D
    H --> C
```

### School Management Flow

```mermaid
graph TD
    A[Dashboard] --> B[Add School]
    A --> C[View Schools]
    B --> D[Get User Location]
    D --> E[Fill School Details]
    E --> F[Submit to Backend]
    F --> G[Save to MongoDB]
    G --> H[Return Success]
    C --> I[Get User Location]
    I --> J[Fetch Schools from API]
    J --> K[Calculate Distances]
    K --> L[Sort by Proximity]
    L --> M[Display Schools]
```

### API Request Flow

```mermaid
sequenceDiagram
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant G as Geolocation

    F->>G: Get User Location
    G->>F: Return Coordinates
    F->>B: API Request with Location
    B->>DB: Query Schools
    DB->>B: Return School Data
    B->>B: Calculate Distances
    B->>F: Return Sorted Schools
    F->>F: Update UI
```

## 🚀 Installation

### Prerequisites

- Node.js (v20.19+ or v22.12+)
- MongoDB Atlas account
- Git

### Clone Repository

```bash
git clone https://github.com/022-Agamsingh/School_Management_Api.git
cd School_Management_Api
```

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your environment variables
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET_KEY=your_secret_key

# Start development server
npm start
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:3000" > .env

# Start development server
npm run dev
```

## 📚 API Documentation

### Authentication Endpoints

#### POST /signup

Register a new user

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /login

Authenticate user

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Protected Endpoints

#### GET /profile

Get user profile (requires authentication)

#### PUT /profile

Update user profile (requires authentication)

```json
{
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

#### DELETE /profile

Delete user account (requires authentication)

#### POST /addSchool

Add new school (requires authentication)

```json
{
  "name": "ABC School",
  "address": "123 Main St, City",
  "latitude": 40.7128,
  "longitude": -74.006
}
```

#### GET /listSchools

Get schools sorted by distance

```
GET /listSchools?latitude=40.7128&longitude=-74.0060
```

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET_KEY=your_super_secret_key
NODE_ENV=production
```

### Frontend (.env)

```env
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

## 🌐 Deployment

### Backend Deployment (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Frontend Deployment (Vercel)

1. Build the project: `npm run build`
2. Deploy to Vercel
3. Set `VITE_API_BASE_URL` environment variable
4. Configure custom domain (optional)

### Environment Variables for Production

#### Vercel Backend Settings

```
MONGODB_URI=mongodb+srv://2002agamsingh:agam@week-7.hwe9ccb.mongodb.net/SchoolDB
JWT_SECRET_KEY=Singh1147
NODE_ENV=production
```

#### Vercel Frontend Settings

```
VITE_API_BASE_URL=https://school-management-api-flame.vercel.app
```

## 📁 Project Structure

```
School_Management_Api/
├── 📁 server/
│   ├── 📁 config/
│   │   └── database.js
│   ├── 📁 middlewares/
│   │   └── auth.js
│   ├── 📁 src/
│   │   └── 📁 models/
│   │       ├── user.js
│   │       └── school.js
│   ├── 📁 utils/
│   │   └── validator.js
│   ├── index.js
│   ├── package.json
│   ├── vercel.json
│   └── .env
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── SchoolList.jsx
│   │   │   ├── AddSchool.jsx
│   │   │   └── Navigation.jsx
│   │   ├── 📁 config/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vercel.json
│   └── .env
├── README.md
├── API_DOCUMENTATION.md
└── DEPLOYMENT_GUIDE.md
```

## 🔍 Key Features Explained

### 🔐 JWT Authentication

- Secure token-based authentication
- HTTP-only cookies for token storage
- Automatic token validation middleware
- Session management with expiration

### 🌍 Geolocation Integration

- Browser Geolocation API for user location
- Haversine formula for distance calculation
- Schools sorted by proximity to user
- Fallback for location access denial

### 📊 Distance Calculation

```javascript
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Protected route access
- [ ] School addition with geolocation
- [ ] School list with distance sorting
- [ ] Profile management (update/delete)
- [ ] Logout functionality
- [ ] Error handling and validation

### API Testing with Postman

Import the provided Postman collection for comprehensive API testing.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Agam Singh**

- GitHub: [@022-Agamsingh](https://github.com/022-Agamsingh)
- Email: 2002agamsingh@gmail.com

## 🙏 Acknowledgments

- MongoDB Atlas for cloud database hosting
- Vercel for seamless deployment
- React.js community for excellent documentation
- Express.js for robust backend framework

---

## 🎯 Quick Start Commands

```bash
# Clone and setup
git clone https://github.com/022-Agamsingh/School_Management_Api.git
cd School_Management_Api

# Backend
cd server && npm install && npm start

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

**🚀 Your School Management System is ready to deploy!**
