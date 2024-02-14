import { Router } from "express";
import passport from "passport";
import { handlePost } from "../../controllers/sessionController.js";

export const sessionRouter = Router()

sessionRouter.post("/", passport.authenticate('login', {
    failWithError: true
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
  } )
