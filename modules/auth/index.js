const service = require('./auth-service')

module.exports = function(app){
    app.post('/user/signup',service.signUp)
}