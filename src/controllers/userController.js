import { userService } from "../services/userServices.js";

export async function handleGet(req, res, next) {
    try {
        if(req.params.id){
            const user = await userService.getUser(req.params.id);
        res.json(user);
        }else{
            const users = await userService.getAllUsers()
            res.json(users);
        }
    } catch (error) {
        res.send(error);
    }
}
export async function handlePost(req, res, next) {
    try {
        const user = await userService.createUser(req.body)
    res.json(user);
    } catch (error) {
        res.send(error);
    }
}

export async function handleDelete(req, res, next) {
try {
    await userService.deleteUser(req.params.id)
    res.send("Delete user successfully")
} catch (error) {
    res.send(error);    
}
}

export async function handlePut(req, res, next) {
    try {
        if(req.params.id && req.body){
            const newUser = await userService.updateUser(req.params.id, req.body)
            res.json(newUser);
        }
    } catch (error) {
        res.send(error)
    }
}