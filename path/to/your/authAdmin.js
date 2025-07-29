import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        // Check for both aToken and atoken in headers (case-insensitive)
        const atoken = req.headers.aToken || req.headers.atoken;
        if (!atoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        // Check the email property in the JWT payload
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin; 