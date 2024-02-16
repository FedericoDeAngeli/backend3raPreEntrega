import { UserManager } from "../models/userModel.js";
import CustomError from "../services/errors/customErrors.js";
import EError from "../services/errors/enums.js";

class UserDAO {
    async  create(data){
        const user = (await UserManager.create(data)).toObject()
        return user;
    }

    async readOne(data){
            const user = await UserManager.findOne(data).lean()
        if(!user)   CustomError.createError({
            name: "User not found",
            cause: "Invalidad Data",
            message: "User not found",
            code: EError.INVALID_VALUE
        })

        return user
    }

    async readMany(){
        const users = await UserManager.find().lean()
        return users
    }

    async updateOne(id, data){
        const newUser = await UserManager.findByIdAndUpdate(id,
            {$set: data},
            {new: true}).lean()

            return newUser    
    }

    async deleteOne(id){
        await UserManager.findByIdAndDelete(id)
    }
}

export const userDAO = new UserDAO();