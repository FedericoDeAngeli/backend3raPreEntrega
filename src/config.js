import dotenv from "dotenv"
dotenv.config()

export const PORT = 8080
export const SESSION_SECRET = 'SecretCoder'
export const MONGODB_CNX_STRING = process.env.MONGODB_CNX_STRING || "mongodb"
export const USER_EMAIL = process.env.USER_EMAIL
export const USER_PASSWORD = process.env.USER_PASSWORD
export const NODE_ENV = process.env.NODE_ENV 
export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER
export const TWILIO_SID = process.env.TWILIO_SID
export const TWILIO_AUTH_TOKEN= process.env.TWILIO_AUTH_TOKEN
export const ADMIN_PHONE_NUMBER = process.env.ADMIN_PHONE_NUMBER
