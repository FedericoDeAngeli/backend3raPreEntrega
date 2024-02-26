import dotenv from "dotenv"
dotenv.config()

export const PORT = 8080
export const SESSION_SECRET = 'SecretCoder'
export const MONGODB_CNX_STRING = process.env.MONGODB_CNX_STRING || "mongodb"
export const USER_EMAIL = process.env.USER_EMAIL
export const USER_PASSWORD = process.env.USER_PASSWORD
export const NODE_ENV = process.env.NODE_ENV 
