import { userRepository } from "../repository/userRepository.js"
import { comparePass, hashear } from "../utils/criptografia.js"

class UserService{
    async createUser(data){
        return await userRepository.createUser(data)
    }

    async getUserbyId(_id){
      return await userRepository.getUserById(_id)
  }
    async getUser(data){
        return await userRepository.getUser(data)
    }

    async getAllUsers(){
        return await userRepository.getAllUsers()
    }

    async updateUser(_id, data){
        return await userRepository.updateUser(_id, data)
    }

    async deleteAll(){
      return await userRepository.deleteAll()
    }

    async deleteUser(id){
        return await userRepository.deleteUser(id)
    }
};

class AuthService{
  async authenticateUser(email, password) {
    let datosUsuario;

    const usuario = await userRepository.getUser({ email });

    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    if (!comparePass(password, usuario.password)) {
        throw new Error('Las contraseñas no coinciden');
    }

    // Actualizar el valor de lastLogin en el documento del usuario
    usuario.lastlogin = new Date();
    
    // Guardar los cambios actualizados en la base de datos
    await usuario.save();

    datosUsuario = {
        email: usuario.email,
        name: usuario.name,
        lastname: usuario.lastname,
        rol: usuario.rol,
        cart: usuario.cart,
        lastlogin: usuario.lastlogin
    };

    console.log(datosUsuario);

    return datosUsuario;
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