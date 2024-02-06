import passport from "passport"

export function handlePost(req, res, next) {
   
    passport.authenticate('login', {
        failWithError: true
    })(req, res, next, function (error, user, info) {
        if (error) {
            return res.status(401).json({
                status: 'error',
                message: 'login failed',
                error: error.message
            });
        }

       
        res.send("Ok");
    });
}
