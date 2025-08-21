# School Management API

A Node.js REST API for managing schools with proximity-based search functionality using MySQL database.

## 📋 Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## ✨ Features

- **Add Schools**: Add new schools with name, address, and coordinates
- **Proximity Search**: Find schools sorted by distance from user's location
- **Input Validation**: Comprehensive validation for all inputs
- **Geographic Calculations**: Uses Haversine formula for accurate distance calculations
- **MySQL Integration**: Persistent data storage with MySQL database
- **Environment Configuration**: Secure configuration using environment variables
- **Postman Collection**: Ready-to-use API testing collection

## 🔧 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** (comes with Node.js)
- **Postman** (optional, for API testing)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/022-Agamsingh/School_Management_Api.git
   cd School_Management_Api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🗃️ Database Setup

1. **Create MySQL Database**
   ```sql
   CREATE DATABASE SchoolDB;
   USE SchoolDB;
   ```

2. **The application will automatically create the schools table when you run it for the first time**

   The table structure:
   ```sql
   CREATE TABLE schools (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       address VARCHAR(255) NOT NULL,
       latitude DECIMAL(10, 8) NOT NULL,
       longitude DECIMAL(11, 8) NOT NULL
   );
   ```

## ⚙️ Configuration

1. **Create a `.env` file in the root directory**
   ```env
   HOST=localhost
   USER=your_mysql_username
   PASSWORD=your_mysql_password
   DATABASE=SchoolDB
   PORT=3001
   ```

2. **Update the values with your MySQL credentials**

## 🚀 Running the Application

1. **Start the server**
   ```bash
   node index.js
   ```

2. **You should see:**
   ```
   Connected to the database
   Server is running on port 3001
   ```

3. **The API is now available at:** `http://localhost:3001`

## 📚 API Endpoints

### 1. Add School
- **URL:** `POST /addSchool`
- **Description:** Add a new school to the database
- **Request Body:**
  ```json
  {
    "name": "Central High School",
    "address": "123 Education Street, New York, NY",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "School added successfully.",
    "school": {
      "name": "Central High School",
      "address": "123 Education Street, New York, NY",
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  }
  ```

### 2. List Schools by Proximity
- **URL:** `GET /listSchools?latitude={lat}&longitude={lng}`
- **Description:** Get all schools sorted by distance from user's location
- **Parameters:**
  - `latitude` (required): User's latitude
  - `longitude` (required): User's longitude
- **Example:** `GET /listSchools?latitude=40.7589&longitude=-73.9851`
- **Success Response:**
  ```json
  {
    "message": "Schools retrieved successfully.",
    "userLocation": {
      "latitude": 40.7589,
      "longitude": -73.9851
    },
    "schools": [
      {
        "id": 1,
        "name": "Central High School",
        "address": "123 Education Street, New York, NY",
        "latitude": 40.7128,
        "longitude": -74.0060,
        "distance": 5.234
      }
    ]
  }
  ```

## 🧪 Testing

### Option 1: Using Postman
1. **Import the collection:** `School_Management_API.postman_collection.json`
2. **Run the requests** to test both endpoints

### Option 2: Using curl
```bash
# Add a school
curl -X POST http://localhost:3001/addSchool \
  -H "Content-Type: application/json" \
  -d '{"name":"Test School","address":"123 Main St","latitude":40.7128,"longitude":-74.0060}'

# List schools
curl "http://localhost:3001/listSchools?latitude=40.7589&longitude=-73.9851"
```

### Option 3: Using PowerShell
```powershell
# Add a school
Invoke-RestMethod -Uri "http://localhost:3001/addSchool" -Method POST -ContentType "application/json" -Body '{"name":"Test School","address":"123 Main St","latitude":40.7128,"longitude":-74.0060}'

# List schools
Invoke-RestMethod -Uri "http://localhost:3001/listSchools?latitude=40.7589&longitude=-73.9851"
```

### Option 4: Using Test Script
```bash
node test-api.js
```

## 📁 Project Structure

```
School_Management_Api/
├── .env                              # Environment variables
├── .gitignore                        # Git ignore file
├── README.md                         # Project documentation
├── API_DOCUMENTATION.md              # Detailed API documentation
├── package.json                      # Node.js dependencies
├── package-lock.json                 # Locked dependency versions
├── index.js                          # Main application file
├── database.js                       # Database connection setup
├── test-api.js                       # API testing script
└── School_Management_API.postman_collection.json  # Postman collection
```

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **MySQL2** - MySQL client for Node.js
- **dotenv** - Environment variable management
- **ES6 Modules** - Modern JavaScript module system

## 🔍 Key Features Explained

### Input Validation
- **Name & Address:** Must be non-empty strings
- **Coordinates:** Must be valid numbers within geographic ranges
  - Latitude: -90 to 90 degrees
  - Longitude: -180 to 180 degrees

### Distance Calculation
- Uses the **Haversine formula** for accurate geographic distance calculation
- Returns distance in kilometers
- Schools are sorted from closest to farthest

### Error Handling
- Comprehensive error messages for invalid inputs
- Database connection error handling
- Proper HTTP status codes (200, 201, 400, 500)

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MySQL server is running
   - Verify credentials in `.env` file
   - Ensure database `SchoolDB` exists

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Or kill the process using the port

3. **Module Not Found Error**
   - Run `npm install` to install dependencies
   - Ensure Node.js is properly installed

## 📝 API Usage Examples

### Adding Multiple Schools
```javascript
// Add first school
POST /addSchool
{
  "name": "Harvard University",
  "address": "Cambridge, MA",
  "latitude": 42.3744,
  "longitude": -71.1169
}

// Add second school
POST /addSchool
{
  "name": "MIT",
  "address": "Cambridge, MA", 
  "latitude": 42.3601,
  "longitude": -71.0942
}

// Find schools near Boston
GET /listSchools?latitude=42.3601&longitude=-71.0589
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Agam Singh**
- GitHub: [@022-Agamsingh](https://github.com/022-Agamsingh)

---

**Happy Coding! 🎉**
