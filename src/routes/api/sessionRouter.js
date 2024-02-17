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


  sessionRouter.get('/current', (req, res) => {
    if (req.user) {
      return res.json(req.user)
    }
    res.status(400).json({ status: 'error', message: 'no hay una sesion iniciada' })
  })
  
  sessionRouter.delete('/current', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ status: 'logout error', body: err })
      }
      res.json({ status: 'success', message: 'logout OK' })
    })
  })
