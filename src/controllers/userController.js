import { userService} from "../services/userServices.js";
import passport from "passport";

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
export async function handlePost(req, res, next)  {
    
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
  }}

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