import validator from "validator";

const isvaildsignup = (req) => {
    const { name, email, password } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
        return { isValid: false, error: "Name must be a non-empty string" };
    }

    if (!email || !validator.isEmail(email)) {
        return { isValid: false, error: "Invalid email format" };
    }

    if (!password || password.length < 6) {
        return { isValid: false, error: "Password must be at least 6 characters long" };
    }

    return { isValid: true };
};

const isvalidSchoolData = (req) => {
    const { name, address, latitude, longitude } = req.body;
    
    if (!name || typeof name !== "string" || name.trim() === "") {
        return { isValid: false, error: "Name must be a non-empty string" };
    }
    
    if (!address || typeof address !== "string" || address.trim() === "") {
        return { isValid: false, error: "Address must be a non-empty string" };
    }
    
    if (latitude === undefined || latitude === null || isNaN(Number(latitude))) {
        return { isValid: false, error: "Latitude must be a valid number" };
    }
    
    if (longitude === undefined || longitude === null || isNaN(Number(longitude))) {
        return { isValid: false, error: "Longitude must be a valid number" };
    }
    
    return { isValid: true };
};

const logValidation = (inputresult) => {
    const { latitude, longitude } = inputresult;
    
    if (latitude < -90 || latitude > 90) {
        return { isValid: false, error: "Latitude must be between -90 and 90 degrees" };
    }
    
    if (longitude < -180 || longitude > 180) {
        return { isValid: false, error: "Longitude must be between -180 and 180 degrees" };
    }
    
    return { isValid: true };
};

export { isvaildsignup, isvalidSchoolData, logValidation };