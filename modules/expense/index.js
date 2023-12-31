const service = require('./expense-service')

module.exports = function (app) {
    app.post('/expense/create', service.createExpense)
    app.put('/expense/update', service.updateExpense)
    app.get('/expense/list', service.getAllExpenseList)
    app.get('/expense/summery', service.expenseSummery)
    app.get('/expense/chartDetails', service.chartDetails)
    app.get('/expense/setExpenseLimit', service.setExpenseLimit)
}