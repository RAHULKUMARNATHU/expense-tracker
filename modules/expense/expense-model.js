const sqlInstance = require('../../database/mysql')
const common = require('../../utils/common')
const constants = require('../../utils/constants')
const { Op } = require('sequelize')

const expense = function () {
}

expense.createExpense = async (requestData) => {
    try {
      await sqlInstance.sequelize.models.expenses.create(requestData, { raw: true })
      console.log('Expense Created Successfully for the category', requestData.category)
      return true
    } catch (error) {
    //   if (error.name.toLowerCase() === 'sequelizeforeignkeyconstrainterror') {
    //     console.log(`Cannot Create Taluka.The referenced district does not exist:`, error.message)
    //     throw new Error(constants.messageKeys.en.msg_ref_error)
    //   }

      console.log('Error in expense.createExpense while saving expense details. Error: %j', error.message)
      throw new Error(error)
    }
  }

  expense.updateExpense = async (requestData) => {
    try {
      const data = await sqlInstance.sequelize.models.expenses.update(requestData, { where: { expense_id: requestData.expense_id }, raw: true })
      if (data[0] === 1) {
        console.log('Expense Details Updated Successfully Of Expense Id:', requestData.expense_id)
        return true
      } else {
        console.log('Failed To Updated expense Details Of Expense Id:', requestData.expense_id)
        return false
      }
    } catch (error) { 
     console.log('Error in expense.updateExpense while updating expense details. Error: %j', error.message)
      throw new Error(error)
    }
  }

  module.exports = expense