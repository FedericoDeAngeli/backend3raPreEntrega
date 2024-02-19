import { responseFailed } from './responseFailed.js';


export function soloLogueadosApi(req, res, next) {
  if (!req.isAuthenticated()) {
    return responseFailed.failedGet();
  }
  next();
}
  
export function soloLogueadosWeb(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
      }
    next();
  }

export function soloAdmin(req, res, next) {
  if (req.user.rol !== "admin") {
   return res.send("solo admin");
  }
  next();
}

export function soloUser(req, res, next) {
  if(req.user.rol !== "user"){
    return res.send("solo user");
  }
    next();
  };

  export function isAdmin(username, password) {
    return username === 'adminCoder@coder.com' && password === 'adminCod3r123'
  }
