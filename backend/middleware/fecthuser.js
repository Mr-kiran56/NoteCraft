const jwt = require("jsonwebtoken");
const JWT_SECRET = "psycho get you me";  

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");  

    if (!token) {
        return res.status(401).json({ error: "Token not provided" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);  
        req.user = data.user;  
        next();  // Proceed to next middleware
    } catch (error) {
        console.error("JWT Verification Error:", error.message);  
        return res.status(401).json({ error: "Invalid token", details: error.message });
    }
};

module.exports = fetchuser;
