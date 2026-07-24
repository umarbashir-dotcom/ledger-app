import jwt from "jsonwebtoken"
import User from "../models/UserModal.js"

const requireAuth = async (req, res, next) => {
    let token;

    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]

            // verify token
            let decoded = jwt.verify(token, process.env.JWT_SECRET)

            // attaching user with req object
            req.user = await User.findById(decoded.id).select("-password")

            next()
        }
    } catch(error){
        console.log(error)
        res.status(401)  // Unauthorized
        throw new Error("Unauthorized user")
    }

    if(!token){
        res.status(401)  // Unauthorized
        throw new Error("Unauthorized user, no token")
    }
}

export default requireAuth;