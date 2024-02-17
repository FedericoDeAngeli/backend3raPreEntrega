import { userRepository } from "../repository/userRepository.js"
import { comparePass, hashear } from "../utils/criptografia.js"

class UserService{
    async createUser(data){
        return await userRepository.createUser(data)
    }

    async getUser(id){
        return await userRepository.getUser(id)
    }

    async getAllUsers(){
        return await userRepository.getAllUsers()
    }

    async updateUser(id, data){
        return await userRepository.updateUser(id, data)
    }

    async deleteUser(id){
        return await userRepository.deleteUser(id)
    }
};

class AuthService{
    async authenticateUser (email, password) {
     
        let datosUsuario
  
       const usuario = await userRepository.getUser({ email })
  
          if (!usuario) {
            throw new Error('usuario no encontrado')
          }
  
          if (!comparePass(password, usuario['password'])) {
            throw new Error('las contraseñas no coinciden')
          }
  
          datosUsuario = {
            email: usuario['email'],
            name: usuario['name'],
            lastname: usuario['lastname'],
            rol: usuario['rol'],
          }
        
  
        if (!datosUsuario) {
          throw new Error('usuario no encontrado')
        }
  
        return datosUsuario
        
      }


async registerUser(reqBody) {
    reqBody.password = hashear(reqBody.password)
    const creado = await userRepository.createUser(reqBody)

    const datosUsuario = {
      email: creado.email,
      name: creado.name,
      lastname: creado.lastname,
      rol: creado.rol
    }

    return datosUsuario
  }

  async resetearContrasenia (email, password) {
    const newPassword = hashear(password)

    const actualizado = await userRepository.updateUser(
      { email },
      { $set: { password: newPassword } },
      // @ts-ignore
      { new: true }
    )

    if (!actualizado) {
      throw new Error('usuario no encontrado')
    }

    return {
      email: actualizado['email'],
      name: actualizado['name'],
      lastname: actualizado['lastname'],
      rol: actualizado['rol'],
    }
  }
}

export const userService = new UserService();
export const authService = new AuthService();