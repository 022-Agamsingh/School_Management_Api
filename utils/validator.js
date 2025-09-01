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

export { isvaildsignup };