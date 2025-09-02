import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import User from "./src/models/user.js";
import School from "./src/models/school.js";
import connectDB from "./config/database.js";
import { isvaildsignup, isvalidSchoolData,logValidation } from "./utils/validator.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import { userAuth } from "./middlewares/auth.js";



dotenv.config();

const app = express();


app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3001"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});

app.post("/signup", async (req, res) => {
    try { 
       
        const validation = isvaildsignup(req);
        if (!validation.isValid) {
            return res.status(400).json({ error: validation.error });
        }

        const { name, email, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashpassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error.message);
        if (error.code === 11000) {
            res.status(400).json({ error: "Email already exists" });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await User.findOne({ email: email });
        if (foundUser) {
            const isMatch = await foundUser.validatePassword(password);
            if (isMatch) {

             const token= await foundUser.getJWT();  
            res.cookie("token",token)

                res.status(200).json({ message: "User logged in successfully", user: foundUser });


            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ error: "emailid not found" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
   
app.get("/profile",userAuth,async(req,res)=>{
try{
    res.status(200).json({user: req.user});
}catch(err){
    console.error("Error fetching user profile:", err.message);
    res.status(500).json({ error: "Internal server error" });
}
 

});



app.put("/profile",userAuth,async(req,res)=>{
    try{
        const { name, email } = req.body;
        await User.findByIdAndUpdate(req.user._id, { name, email }, { new: true });
        res.status(200).json({ message: "User profile updated successfully" });
    }catch(err){
        console.error("Error updating user profile:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.delete("/profile",userAuth,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.user._id);
        res.status(200).json({ message: "User profile deleted successfully" });
    }catch(err){
        console.error("Error deleting user profile:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/addSchool", userAuth, async function(req, res) {
    try {
        const { name, address, latitude, longitude } = req.body;

      
        const valid_date = isvalidSchoolData(req);
        if (!valid_date.isValid) {
            return res.status(400).json({ error: valid_date.error });
        }

        const lat = Number(latitude);
        const lng = Number(longitude);
        
        
        const latinput = { latitude: lat, longitude: lng };
        const validationResponse = logValidation(latinput);
        if (!validationResponse.isValid) {
            return res.status(400).json({ error: validationResponse.error });
        }

        const newSchool = new School({
            name: name.trim(),
            address: address.trim(),
            latitude: lat,
            longitude: lng
        });

        // Save to MongoDB
        const savedSchool = await newSchool.save();

        res.status(201).json({
            message: "School added successfully.",
            school: {
                id: savedSchool._id,
                name: savedSchool.name,
                address: savedSchool.address,
                latitude: savedSchool.latitude,
                longitude: savedSchool.longitude,
                createdAt: savedSchool.createdAt
            }
        });
        
    } catch (error) {
        console.error("Error adding school:", error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        res.status(500).json({ error: "Internal server error while adding school" });
    }
});


app.get("/listSchools", async function(req, res) {
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLng = parseFloat(req.query.longitude);
        if (isNaN(userLat) || isNaN(userLng)) {
            return res.status(400).json({ 
                error: "Valid latitude and longitude are required as query parameters." 
            });
        }
        
        if (userLat < -90 || userLat > 90) {
            return res.status(400).json({ error: "User latitude must be between -90 and 90 degrees." });
        }
        
        if (userLng < -180 || userLng > 180) {
            return res.status(400).json({ error: "User longitude must be between -180 and 180 degrees." });
        }
        
       
        const schools = await School.find({});
        
        
        const toRadians = (degrees) => (degrees * Math.PI) / 180;
        
    
        const calculateDistance = (lat1, lng1, lat2, lng2) => {
            const R = 6371; // Earth's radius in kilometers
            const dLat = toRadians(lat2 - lat1);
            const dLng = toRadians(lng2 - lng1);
            const a = 
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            return distance;
        };
        
        
        const schoolsWithDistance = schools.map(school => ({
            id: school._id,
            name: school.name,
            address: school.address,
            latitude: school.latitude,
            longitude: school.longitude,
            distance: calculateDistance(
                userLat, 
                userLng, 
                school.latitude, 
                school.longitude
            ),
            createdAt: school.createdAt
        }));
        
      
        const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        
        res.json({
            message: "Schools retrieved successfully.",
            userLocation: { latitude: userLat, longitude: userLng },
            totalSchools: sortedSchools.length,
            schools: sortedSchools
        });
        
    } catch (error) {
        console.error("Error fetching schools:", error);
        res.status(500).json({ error: "Internal server error while fetching schools." });
    }
}); 

// Start server after defining all routes
connectDB()
.then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Server is listening on all interfaces at port ${PORT}`);
    });
    
    server.on('error', (err) => {
        console.error('Server error:', err);
    });
}).catch((err)=>{
    console.error("MongoDB connection error:", err);
});

export default app;