import pool from '../../config/database.js';

export default async function handler(req, res) {
    // Only allow GET method
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const userLat = parseFloat(req.query.latitude);
        const userLng = parseFloat(req.query.longitude);
        
        // Validation for user coordinates
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
        
        // Calculate distance using Haversine formula
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
        
        // Calculate distance for each school and sort by proximity
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
        
        // Sort by distance (closest first)
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
}
