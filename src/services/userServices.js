import { userRepository } from "../repository/userRepository.js"
// import { comparePass, hashear } from "../utils/criptografia.js"

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
    async authenticateUser(email, password){

        const user = await userRepository.getUser(email)
        if(!user){
        throw new Error ("Usuario incorrecto")    }
        if(password !== user.password){
            throw new Error ("Contraseña incorrecta")
        }

    return user
    }
async registerUser(data){
    // data.password = hashear(data.password)
    const user = await userRepository.createUser(data)

    return user
}
}

export const userService = new UserService();
export const authService = new AuthService();