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
    async authenticateUser(username, password){
        let datosUsuario

        const usuario = await userRepository.getUser({email: username}).lean()
        if(!usuario){
        throw new Error ("Usuario incorrecto")    }
        if(comparePass(password, usuario.password)){
            throw new Error ("Contraseña incorrecta")
        }

        datosUsuario = {
            email: usuario['email'],
            name: usuario['name'],
            lastname: usuario['lastname'],
            rol: usuario['rol']
          }
        
  
        if (!datosUsuario) {
          throw new Error('usuario no encontrado')
        }
  
        return datosUsuario
    }
async registerUser(data){
     data.password = hashear(data.password)
    const creado = await userRepository.createUser(data)
    
    const datosUsuario = {
        email: creado.email,
        name: creado.name,
        lastname: creado.lastname,
        rol: creado.rol,
      }
    return datosUsuario
}
}

export const userService = new UserService();
export const authService = new AuthService();