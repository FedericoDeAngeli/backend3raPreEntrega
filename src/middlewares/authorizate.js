// import { responseFailed } from './responseFailed.js';


// export function soloLogueadosApi(req, res, next) {
//   if (!req.isAuthenticated()) {
//     return responseFailed.failedGet();
//   }
//   next();
// }
  
// export function soloLogueadosWeb(req, res, next) {
//     if (!req.isAuthenticated()) {
//         return res.redirect('/login')
//       }
//     next();
//   }

// export function soloAdmin(req, res, next) {
//   if (req.user.rol !== "admin") {
//     return responseFailed.failedValidation();
//   }
//   next();
// }

// export function soloUser(roles = []) {
//   if(req.user.rol !== "user"){
//     return responseFailed.failedValidation();
//   }
//     next();
//   };

//   export function isAdmin(username, password) {
//     return username === 'adminCoder@coder.com' && password === 'adminCod3r123'
//   }
