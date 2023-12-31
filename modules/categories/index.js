const service = require('./categories-service')

module.exports = function(app){
    //Api to create category
    app.post('/category/create', service.createCategory)
    //Api to list all categories
    app.get('/category/list', service.getAllCategoryList)
    //Api to update category
    app.put('/category/update', service.updateCategory)
}