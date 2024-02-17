import passport from "passport"

export function handlePost(req, res, next) {
  passport.authenticate('login', {
    failWithError: true
  }),
  function (req, res) {
    console.log("post session")
    res.json({ status: 'success', payload: req.user })
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
    
