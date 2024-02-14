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
  statics: {
    registrar: async function (reqBody) {
      reqBody.password = hashear(reqBody.password)
      const creado = await mongoose.model(collection).create(reqBody)

      const datosUsuario = {
        email: creado.email,
        nombre: creado.nombre,
        apellido: creado.apellido,
        rol: 'usuario'
      }

      return datosUsuario
    },
    autenticar: async function (username, password) {

      let datosUsuario

      if (isAdmin(username, password)) {
        datosUsuario = {
          email: 'admin',
          nombre: 'admin',
          apellido: 'admin',
          rol: 'admin'
        }
      } else {
        const usuario = await mongoose.model(collection).findOne({ email: username }).lean()

        if (!usuario) {
          throw new Error('usuario no encontrado')
        }

        if (!comparePass(password, usuario['password'])) {
          throw new Error('las contraseñas no coinciden')
        }

        datosUsuario = {
          email: usuario['email'],
          nombre: usuario['nombre'],
          apellido: usuario['apellido'],
          rol: 'usuario'
        }
      }

      if (!datosUsuario) {
        throw new Error('usuario no encontrado')
      }

      return datosUsuario
    },
    resetearContrasenia: async function (email, password) {
      const newPassword = hashear(password)

      const actualizado = await mongoose.model(collection).findOneAndUpdate(
        { email },
        { $set: { password: newPassword } },
        { new: true }
      ).lean()

      if (!actualizado) {
        throw new Error('usuario no encontrado')
      }

      return {
        email: actualizado['email'],
        nombre: actualizado['nombre'],
        apellido: actualizado['apellido'],
        rol: 'usuario'
      }
    }
  }  ,
  methods:{}
})

export const UserManager = model(collection, UserSchema)