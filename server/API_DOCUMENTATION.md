# School Management API Documentation

## Overview

This API allows you to manage schools in a MySQL database and find schools based on proximity to a user's location.

## Database Schema

The `schools` table has the following structure:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL
);
```

## API Endpoints

### 1. Add School

**Endpoint:** `POST /addSchool`

**Description:** Adds a new school to the database with validation.

**Request Body:**

```json
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 40.7128,
  "longitude": -74.006
}
```

**Validation Rules:**

- `name`: Required, non-empty string
- `address`: Required, non-empty string
- `latitude`: Required number between -90 and 90
- `longitude`: Required number between -180 and 180

**Success Response (201):**

```json
{
  "message": "School added successfully.",
  "school": {
    "name": "School Name",
    "address": "School Address",
    "latitude": 40.7128,
    "longitude": -74.006
  }
}
```

**Error Responses (400):**

```json
{
  "error": "Name is required and must be a non-empty string."
}
```

### 2. List Schools

**Endpoint:** `GET /listSchools`

**Description:** Retrieves all schools sorted by proximity to user's location.

**Query Parameters:**

- `latitude`: User's latitude (required)
- `longitude`: User's longitude (required)

**Example Request:**

```
GET /listSchools?latitude=40.7589&longitude=-73.9851
```

**Success Response (200):**

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
      "name": "Closest School",
      "address": "123 Near St",
      "latitude": 40.7128,
      "longitude": -74.006,
      "distance": 5.2
    },
    {
      "id": 2,
      "name": "Farther School",
      "address": "456 Far Ave",
      "latitude": 40.6782,
      "longitude": -73.9442,
      "distance": 12.8
    }
  ]
}
```

## Distance Calculation

The API uses the Haversine formula to calculate geographical distances between coordinates:

- Returns distance in kilometers
- Schools are sorted from closest to farthest
- Formula accounts for Earth's curvature

## Error Handling

All endpoints include comprehensive error handling:

- Input validation errors (400)
- Database connection errors (500)
- Proper error messages for debugging

## Testing

1. Start the server: `node index.js`
2. Use tools like Postman, curl, or the provided test file
3. Server runs on port 3001 by default

## Example Usage

### Using curl (if available):

```bash
# Add a school
curl -X POST http://localhost:3001/addSchool \
  -H "Content-Type: application/json" \
  -d '{"name":"Test School","address":"123 Main St","latitude":40.7128,"longitude":-74.0060}'

# List schools
curl "http://localhost:3001/listSchools?latitude=40.7589&longitude=-73.9851"
```

### Using PowerShell:

```powershell
# Add a school
Invoke-RestMethod -Uri "http://localhost:3001/addSchool" -Method POST -ContentType "application/json" -Body '{"name":"Test School","address":"123 Main St","latitude":40.7128,"longitude":-74.0060}'

# List schools
Invoke-RestMethod -Uri "http://localhost:3001/listSchools?latitude=40.7589&longitude=-73.9851"
```
