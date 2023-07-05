const service = require('./auth-service')

module.exports = function(app){
    app.post('/auth/user/signup',service.signUp)
}