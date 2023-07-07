const service = require('./auth-service')

module.exports = function(app){
    /*route for signup */
    app.post('/user/signup',service.signUp)
    /*route for verify user */
    app.put('/user/verify', service.verifyUser)
    /*login route */
    app.post('/user/login' , service.login)
}