import { Schema, model } from "mongoose"
import { randomUUID } from "crypto"
import { comparePass, hashear } from "../utils/criptografia.js"




const collection = "usuarios"

export const UserSchema = new Schema({
  _id: { type: String, default: randomUUID },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  rol: {type: String, required: true}
}, {
  strict: "throw",
  versionKey: false,
  statics: {  }  ,
  methods:{}
})

export const UserManager = model(collection, UserSchema)