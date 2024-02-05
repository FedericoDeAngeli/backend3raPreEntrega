import { userRepository } from "../repository/userRepository.js"

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

export const userService = new UserService();