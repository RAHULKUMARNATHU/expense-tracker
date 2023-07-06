const common = require('../../utils/common')
const constants = require('../../utils/constants')
const schemas = require('./expense-schema')
const expense = require('./expense-model')

const createExpense = async function (req, res) {
    try {
      const requestDetails = common.sanitize(req.body, schemas.createExpense, constants.moduleNames.expenses)
    
      if (schemas.validate(requestDetails, schemas.createExpense)) {
        const expenseDetails = await expense.createExpense(requestDetails)
        res.status(constants.httpStatusCode.success).send({
          code: constants.responseCodes.successfulOperation,
          message: constants.messageKeys.en.msg_success,
          data: expenseDetails
        })
      } else {
        res.status(constants.httpStatusCode.badRequest).send({
          code: constants.responseCodes.revalidation,
          message: constants.messageKeys.en.msg_revalidate
        })
      }
    } catch (error) {
      res.status(constants.responseCodes.failedOperation).send({
        code: constants.responseCodes.failedOperation,
        message: error.message
      })
    }
  }

  const updateExpense = async function (req, res) {
    try {
      const requestDetails = common.sanitize(req.body, schemas.updateExpense, constants.moduleNames.expenses)

      if (schemas.validate(requestDetails, schemas.updateExpense)) {
        const expenseDetails = await expense.updateExpense(requestDetails)
        res.status(constants.httpStatusCode.success).send({
          code: constants.responseCodes.successfulOperation,
          message: constants.messageKeys.en.msg_success,
          data: expenseDetails
        })
      } else {
        res.status(constants.httpStatusCode.badRequest).send({
          code: constants.responseCodes.revalidation,
          message: constants.messageKeys.en.msg_revalidate
        })
      }
    } catch (error) {
      res.status(constants.responseCodes.failedOperation).send({
        code: constants.responseCodes.failedOperation,
        message: error.message
      })
    }
  }

  module.exports = {
    createExpense,
    updateExpense
  }