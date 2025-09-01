import express from "express";
import dotenv from "dotenv";
import User from "./src/models/user.js";
import connectDB from "./config/database.js";
import { isvaildsignup } from "./utils/validator.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import { userAuth } from "./middlewares/auth.js";



dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Define routes first
// app.get("/", (req, res) => {
//     res.json({ message: "Server is running!" });
// });

app.post("/signup", async (req, res) => {
   

    try { 
        isvaildsignup(req);
         const { name, email, password } = req.body;
        const hashpassword= await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password:hashpassword });
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
            const isMatch = await bcrypt.compare(password, foundUser.password);
            if (isMatch) {

             const token= await jwt.sign({_id : foundUser.id},process.env.JWT_SECRET_KEY);   
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






// Connect to database and start server
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

// app.post("/addSchool", async function(req, res) {
//     try {
//         const  name  = req.body.name;
//         const    address = req.body.address;
//         const   latitude = req.body.latitude;
//         const   longitude = req.body.longitude;

//         if (!name || typeof name !== "string" || name.trim() === "") {
//             return res.status(400).json({ error: "Name must be a non-empty string" });
//         }
        
//         if (!address || typeof address !== "string" || address.trim() === "") {
//             return res.status(400).json({ error: "Address must be a non-empty string" });
//         }
        
//         if (latitude === undefined || latitude === null || isNaN(Number(latitude))) {
//             return res.status(400).json({ error: "Latitude must be a valid numbe." });
//         }
        
//         if (longitude === undefined || longitude === null || isNaN(Number(longitude))) {
//             return res.status(400).json({ error: "Longitude  must be a valid number" });
//         }
        
        
//         const lat = parseFloat(latitude);
//         const lng = parseFloat(longitude);
        
        
//         if (lat < -90 || lat > 90) {
//             return res.status(400).json({ error: "write value between -90 and 90 degrees" });
//         }
        
//         if (lng < -180 || lng > 180) {
//             return res.status(400).json({ error: "write value between -180 and 180 degrees" });
//         }
        
       
//         await pool.execute(
//             "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
//             [name.trim(), address.trim(), lat, lng]
//         );
        
//         res.status(201).json({ 
//             message: "School added successfully.",
//             school: { name: name.trim(), address: address.trim(), latitude: lat, longitude: lng }
//         });
        
//     } catch (error) {
//         console.error("Error adding school:", error);
//         res.status(500).json({ error: "Internal server error while adding school" });
//     }
// });


// app.get("/listSchools", async function(req, res) {
//     try {
//         const userLat = parseFloat(req.query.latitude);
//         const userLng = parseFloat(req.query.longitude);
        
        
//         if (isNaN(userLat) || isNaN(userLng)) {
//             return res.status(400).json({ 
//                 error: "Valid latitude and longitude are required as query parameters." 
//             });
//         }
        
//         if (userLat < -90 || userLat > 90) {
//             return res.status(400).json({ error: "User latitude must be between -90 and 90 degrees." });
//         }
        
//         if (userLng < -180 || userLng > 180) {
//             return res.status(400).json({ error: "User longitude must be between -180 and 180 degrees." });
//         }
        
        
//         const [schools] = await pool.execute("SELECT * FROM schools");
        
      
//         const toRadians = (degrees) => (degrees * Math.PI) / 180;
        
//         const calculateDistance = (lat1, lng1, lat2, lng2) => {
//             const R = 6371; 
//             const dLat = toRadians(lat2 - lat1);
//             const dLng = toRadians(lng2 - lng1);
//             const a = 
//                 Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//                 Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//                 Math.sin(dLng / 2) * Math.sin(dLng / 2);
//             const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//             const ans = R * c;
//             console.log("Distance btw school and user:", ans);
//             return ans;
//         };
        
        
//         const schoolsWithDistance = schools.map(school => ({
//             id: school.id,
//             name: school.name,
//             address: school.address,
//             latitude: parseFloat(school.latitude),
//             longitude: parseFloat(school.longitude),
//             distance: calculateDistance(
//                 userLat, 
//                 userLng, 
//                 parseFloat(school.latitude), 
//                 parseFloat(school.longitude)
//             )
//         }));
        
       
//         const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        
//         res.json({
//             message: "Schools retrieved successfully.",
//             userLocation: { latitude: userLat, longitude: userLng },
//             schools: sortedSchools
//         });
        
//     } catch (error) {
//         console.error("Error fetching schools:", error);
//         res.status(500).json({ error: "Internal server error while fetching schools." });
//     }
// }); 


// const PORT = process.env.PORT || 3001;

export default app;