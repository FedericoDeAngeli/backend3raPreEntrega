import { userDAO } from "../dao/user.dao.js";

class UserRepository{
    async createUser(data){
        return await userDAO.create(data)
    }
    async getUserById(_id){
        return await userDAO.getUserById(_id)
    }
    async getUser(data){

        return await userDAO.readOne(data)
    }

    async getAllUsers(){
        return await userDAO.readMany()
    }

    async updateUser(_id, data){
        return await userDAO.updateOne(_id, data)
    }

    async deleteAll(){
        return await userDAO.deleteAll()
    }

    async deleteUser(id){
        return await userDAO.deleteOne(id)
    }
}

export const userRepository = new UserRepository()