# 🧪 Postman Testing Guide for Deployed API

## 🎯 Your Deployed API URL
```
https://school-management-api-steel.vercel.app
```

## 📋 Step-by-Step Postman Testing

### **Step 1: Import Updated Collection**
1. **Open Postman**
2. **Click "Import"** button (top left)
3. **Select** `School_Management_API.postman_collection.json`
4. **Click "Import"**

### **Step 2: Test API Health**
First, let's check if your API is responding:

**Manual Request Setup:**
- **Method:** `GET`
- **URL:** `https://school-management-api-steel.vercel.app/`
- **Click "Send"**

**Expected Response:** You might get a 404 or some response indicating the server is running.

### **Step 3: Test Add School Endpoint**

#### **Request Configuration:**
- **Method:** `POST`
- **URL:** `https://school-management-api-steel.vercel.app/addSchool`

#### **Headers:**
```
Content-Type: application/json
```

#### **Body (Raw JSON):**
```json
{
    "name": "Test School from Postman",
    "address": "123 Vercel Street, Cloud City",
    "latitude": 40.7128,
    "longitude": -74.0060
}
```

#### **Expected Responses:**

**✅ Success (201):**
```json
{
    "message": "School added successfully.",
    "school": {
        "name": "Test School from Postman",
        "address": "123 Vercel Street, Cloud City",
        "latitude": 40.7128,
        "longitude": -74.0060
    }
}
```

**❌ Database Error (500):**
```json
{
    "error": "Internal server error while adding school"
}
```

### **Step 4: Test List Schools Endpoint**

#### **Request Configuration:**
- **Method:** `GET`
- **URL:** `https://school-management-api-steel.vercel.app/listSchools?latitude=40.7589&longitude=-73.9851`

#### **Query Parameters:**
- `latitude`: `40.7589`
- `longitude`: `-73.9851`

#### **Expected Responses:**

**✅ Success (200):**
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
            "name": "Test School from Postman",
            "address": "123 Vercel Street, Cloud City",
            "latitude": 40.7128,
            "longitude": -74.0060,
            "distance": 5.234
        }
    ]
}
```

## 🔧 Troubleshooting Common Issues

### **Issue 1: Internal Server Error (500)**
**Problem:** Database connection issues
**Solution:** Check Vercel environment variables

**Steps to Fix:**
1. **Go to:** [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. **Select your project:** `school-management-api-steel`
3. **Go to Settings → Environment Variables**
4. **Add these variables:**
   ```
   HOST=your_database_host
   USER=your_database_username
   PASSWORD=your_database_password
   DATABASE=your_database_name
   NODE_ENV=production
   ```
5. **Redeploy** the project

### **Issue 2: Function Timeout**
**Problem:** Database takes too long to respond
**Solution:** Check database connection and optimize queries

### **Issue 3: CORS Issues**
**Problem:** Browser blocking requests
**Solution:** Add CORS headers (not needed for Postman)

## 📊 Testing Scenarios

### **Scenario 1: Valid Data**
```json
{
    "name": "Harvard University",
    "address": "Cambridge, MA",
    "latitude": 42.3744,
    "longitude": -71.1169
}
```

### **Scenario 2: Invalid Latitude**
```json
{
    "name": "Invalid School",
    "address": "Test Address",
    "latitude": 200,
    "longitude": -74.0060
}
```
**Expected:** 400 Bad Request

### **Scenario 3: Missing Name**
```json
{
    "name": "",
    "address": "Test Address",
    "latitude": 40.7128,
    "longitude": -74.0060
}
```
**Expected:** 400 Bad Request

### **Scenario 4: Test Different Locations**
```
# Times Square
?latitude=40.7589&longitude=-73.9851

# Central Park
?latitude=40.7851&longitude=-73.9683

# Brooklyn
?latitude=40.6782&longitude=-73.9442
```

## 🔍 Debugging Tips

### **1. Check Response Status Codes**
- `200` - Success (GET requests)
- `201` - Created (POST requests)
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error (database/server issues)

### **2. Check Response Headers**
Look for:
- `Content-Type: application/json`
- `x-vercel-cache: MISS` (indicates fresh response)

### **3. Check Response Time**
- Should be under 10 seconds (Vercel limit)
- If timeout, check database connection

### **4. Use Console Tab**
Check for any JavaScript errors or additional info

## 🚀 Quick Test Commands (Alternative)

### **Using curl (if you have it):**
```bash
# Test Add School
curl -X POST https://school-management-api-steel.vercel.app/addSchool \
  -H "Content-Type: application/json" \
  -d '{"name":"Curl Test School","address":"123 Terminal St","latitude":40.7128,"longitude":-74.0060}'

# Test List Schools
curl "https://school-management-api-steel.vercel.app/listSchools?latitude=40.7589&longitude=-73.9851"
```

### **Using PowerShell:**
```powershell
# Test Add School
Invoke-RestMethod -Uri "https://school-management-api-steel.vercel.app/addSchool" -Method POST -ContentType "application/json" -Body '{"name":"PowerShell Test","address":"123 PS Street","latitude":40.7128,"longitude":-74.0060}'

# Test List Schools
Invoke-RestMethod -Uri "https://school-management-api-steel.vercel.app/listSchools?latitude=40.7589&longitude=-73.9851"
```

## 📈 Success Indicators

Your API is working correctly if:
- ✅ POST requests return 201 status
- ✅ GET requests return 200 status  
- ✅ Response times are under 5 seconds
- ✅ Data is properly validated
- ✅ Schools are sorted by distance

## 🎯 Next Steps

1. **Test all endpoints** with valid data
2. **Test error scenarios** with invalid data
3. **Check performance** with multiple requests
4. **Share API URL** with others for testing
5. **Update documentation** with live examples

---

**Happy Testing! 🎉**

Your API is live at: `https://school-management-api-steel.vercel.app`
