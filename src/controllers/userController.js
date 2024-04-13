import { userService } from "../services/userServices.js";
import passport from "passport";
import { users } from "../utils/mocks.js";
import { UserSchema } from "../models/userModel.js";

 async function checkInactive(_id, now, lastlogin){
    const inactiveDays =  2* 24 * 60 * 60 * 1000
    console.log(now)
    console.log(lastlogin)
    console.log(now - lastlogin)
    if (now - lastlogin > inactiveDays) {
       
        const users = userService.deleteUser(_id)
        return users
    } 
 }

export async function handleGet(req, res, next) {
    try {
        if (req.params.id) {
            const _id = req.params.id;
            const user = await userService.getUser({ _id });
            const data = {
                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                rol: user.rol
            }
            res.json(data);
        } else {
            const users = await userService.getAllUsers()
            const userData = users.map(user => ({
                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                rol: user.rol,
                lastlogin: user.lastlogin
            }));

            res.json(userData);
        }
    } catch (error) {
        res.send(error);
    }
}
export async function handlePost(req, res, next) {

    passport.authenticate("register", {
        failWithError: true,
    }),
        function (req, res) {
            res.status(201).json({ status: 'success', payload: req.user })
        },
        function (error, req, res, next) {
            res
                .status(401)
                .json({
                    status: 'error',
                    message: 'login failed'
                })
        }
}

export async function handleDelete(req, res, next) {
    
    try {
        if (req.params.id) {
            const _id = req.params.id
            await userService.deleteUser(_id)
            res.send("Delete user successfully")
        }else{
            const usuarios = await userService.getAllUsers()
        const now = new Date()
        usuarios.forEach(async user => {
            const _id = user._id
            const lastlogin = user.lastlogin
            console.log(lastlogin)
        
            
            await checkInactive(_id, now, lastlogin)         
        })
        res.send("No inactive users to delete")

        }
               

    } catch (error) {
        res.send(error);
    }
}

export async function handlePut(req, res, next) {
    try {
        if (req.params.id && req.body) {
            const _id = req.params.id
            console.log(_id)
            const newUser = await userService.updateUser(_id, req.body)
            res.json(newUser);
        }
    } catch (error) {
        res.send(error)
    }
}