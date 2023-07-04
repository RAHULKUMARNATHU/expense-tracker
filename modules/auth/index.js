const service = require('./auth-service')

module.exports = function(app){
    app.get('/auth/user/signup',service.signUp)
}