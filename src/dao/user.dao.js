import { UserManager } from "../models/userModel.js";

class UserDAO {
    async  create(data){
        const user = (await UserManager.create(data)).toObject()
        return user;
    }

    async readOne(id){
        const user = await UserManager.findById(id).lean()
        if(!user) throw new Error("User not found")
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