import { UserManager } from "../models/userModel.js";
import CustomError from "../services/errors/customErrors.js";
import EError from "../services/errors/enums.js";
import { logger } from "../utils/logger.js";

class UserDAO {
    async  create(data){
        const user = await UserManager.create(data)
        return user;
    }
    async getUserById(_id){
        const user = await UserManager.findById(_id)
        return user
    }
    async readOne(data){
            const user = await UserManager.findOne(data)
        if(!user)   CustomError.createError({
            name: "User not found",
            cause: "Invalidad Data",
            message: logger.error("User not found"),
            code: EError.INVALID_VALUE
        })
            return user
    }

    async readMany(){
        const users = await UserManager.find().lean()
       
        return users
    }

    async updateOne(_id, data){
        const newUser = await UserManager.findByIdAndUpdate(_id,
            {$set: data},
            {new: true})

            return newUser    
    }

    async deleteAll(){
        await UserManager.deleteMany()
    }

    async deleteOne(id){
        await UserManager.findByIdAndDelete(id)
    }
}

export const userDAO = new UserDAO();