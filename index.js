import express from "express";
import dotenv from "dotenv";
import pool from "./database.js";

dotenv.config();

const app = express();
app.use(express.json());



app.post("/addSchool", async function(req, res) {
    try {
        const  name  = req.body.name;
        const    address = req.body.address;
        const   latitude = req.body.latitude;
        const   longitude = req.body.longitude;

        if (!name || typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({ error: "Name must be a non-empty string" });
        }
        
        if (!address || typeof address !== "string" || address.trim() === "") {
            return res.status(400).json({ error: "Address must be a non-empty string" });
        }
        
        if (latitude === undefined || latitude === null || isNaN(Number(latitude))) {
            return res.status(400).json({ error: "Latitude must be a valid numbe." });
        }
        
        if (longitude === undefined || longitude === null || isNaN(Number(longitude))) {
            return res.status(400).json({ error: "Longitude  must be a valid number" });
        }
        
        
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        
        
        if (lat < -90 || lat > 90) {
            return res.status(400).json({ error: "write value between -90 and 90 degrees" });
        }
        
        if (lng < -180 || lng > 180) {
            return res.status(400).json({ error: "write value between -180 and 180 degrees" });
        }
        
       
        await pool.execute(
            "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
            [name.trim(), address.trim(), lat, lng]
        );
        
        res.status(201).json({ 
            message: "School added successfully.",
            school: { name: name.trim(), address: address.trim(), latitude: lat, longitude: lng }
        });
        
    } catch (error) {
        console.error("Error adding school:", error);
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
        
        
        // Fetch all schools from database
        const [schools] = await pool.execute("SELECT * FROM schools");
        
      
        const toRadians = (degrees) => (degrees * Math.PI) / 180;
        
        const calculateDistance = (lat1, lng1, lat2, lng2) => {
            const R = 6371; 
            const dLat = toRadians(lat2 - lat1);
            const dLng = toRadians(lng2 - lng1);
            const a = 
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const ans = R * c;
            console.log("Distance btw school and user:", ans);
            return ans;
        };
        
        
        const schoolsWithDistance = schools.map(school => ({
            id: school.id,
            name: school.name,
            address: school.address,
            latitude: parseFloat(school.latitude),
            longitude: parseFloat(school.longitude),
            distance: calculateDistance(
                userLat, 
                userLng, 
                parseFloat(school.latitude), 
                parseFloat(school.longitude)
            )
        }));
        
       
        const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        
        res.json({
            message: "Schools retrieved successfully.",
            userLocation: { latitude: userLat, longitude: userLng },
            schools: sortedSchools
        });
        
    } catch (error) {
        console.error("Error fetching schools:", error);
        res.status(500).json({ error: "Internal server error while fetching schools." });
    }
}); 

// For Vercel deployment, export the app instead of listening
const PORT = process.env.PORT || 3001;

// Only listen when running locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, function(){
        console.log("Server is running on port " + PORT);
    });
}

// Export for Vercel
export default app;