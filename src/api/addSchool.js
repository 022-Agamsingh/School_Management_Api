import pool from '../database.js';

export default async function handler(req, res) {
    // Only allow POST method
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, address, latitude, longitude } = req.body;
        
        // Validation
        if (!name || typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({ error: "Name must be a non-empty string" });
        }
        
        if (!address || typeof address !== "string" || address.trim() === "") {
            return res.status(400).json({ error: "Address must be a non-empty string" });
        }
        
        if (latitude === undefined || latitude === null || isNaN(Number(latitude))) {
            return res.status(400).json({ error: "Latitude must be a valid number." });
        }
        
        if (longitude === undefined || longitude === null || isNaN(Number(longitude))) {
            return res.status(400).json({ error: "Longitude must be a valid number" });
        }
        
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        
        if (lat < -90 || lat > 90) {
            return res.status(400).json({ error: "Write value between -90 and 90 degrees" });
        }
        
        if (lng < -180 || lng > 180) {
            return res.status(400).json({ error: "Write value between -180 and 180 degrees" });
        }
        
        // Insert into database
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
}
