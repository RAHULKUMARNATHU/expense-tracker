const service = require('./auth-service')

module.exports = function(app){
    app.post('/user/signup',service.signUp)
    app.put('/user/verify', service.verifyUser)
    app.post('/user/login' , service.login)
}