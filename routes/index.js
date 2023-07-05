module.exports = function(app) {
    require('../modules/auth/index')(app)
    require('../modules/categories/index')(app)

}