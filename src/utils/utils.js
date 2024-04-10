import jwt from "jsonwebtoken"

const PRIVATE_KEY = "SecretCoder"

const generateToken = (user)=>{
    const token = jwt.sign(user, PRIVATE_KEY, {expiresIn: "48h"})
    return token
}

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({
            status: 'error',
            message: 'No token provided'
        })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid token'
            })
        }
        req.user = credentials.user
        next()
    })
}