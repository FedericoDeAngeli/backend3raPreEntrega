import { userDAO } from "../dao/user.dao.js";

class UserRepository{
    async createUser(data){
        return await userDAO.create(data)
    }

    async getUser(data){

        return await userDAO.readOne(data)
    }

    async getAllUsers(){
        return await userDAO.readMany()
    }

    async updateUser(id, data){
        return await userDAO.updateOne(id, data)
    }

    async deleteUser(id){
        return await userDAO.deleteOne(id)
    }
}

export const userRepository = new UserRepository()