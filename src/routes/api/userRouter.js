import { Router } from "express";
import passport from "passport";
import { handleDelete, handleGet, handlePost, handlePut } from "../../controllers/userController.js";
import { soloAdmin } from "../../middlewares/authorizate.js";

export const userRouter = Router()

userRouter.get("/", handleGet)
userRouter.get("/:id", handleGet)

userRouter.post("/",  passport.authenticate('register', {
    failWithError: true
  }),
  function (req, res) {
    res.status(201).json({ status: 'success', payload: req.user })
  },
  function (error, req, res, next) {
    res
      .status(400)
      .json({
        status: 'error',
        message: error.message
      })
  }
)

userRouter.put("/:id", soloAdmin, handlePut)

userRouter.delete("/:id", handleDelete)

userRouter.delete("/", handleDelete)
