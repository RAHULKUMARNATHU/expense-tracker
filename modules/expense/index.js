const service = require('./expense-service')

module.exports = function (app) {
    app.post('/expense/create', service.createExpense)
    app.put('/expense/update', service.updateExpense)
}