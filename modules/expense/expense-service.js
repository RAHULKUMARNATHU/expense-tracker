const common = require('../../utils/common')
const constants = require('../../utils/constants')
const schemas = require('./expense-schema')
const expense = require('./expense-model')

exports.createExpense = async function (req, res) {
  req.query.user_id = req.user.user_id
    try {
      const requestDetails = common.sanitize(req.body, schemas.createExpense, constants.moduleNames.expenses)
      requestDetails.user_id = req.user.user_id
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

  exports.updateExpense = async function (req, res) {
    try {
      const requestDetails = common.sanitize(req.body, schemas.updateExpense, constants.moduleNames.expenses)
      requestDetails.user_id = req.user.user_id
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

  exports.getAllExpenseList = async function (req, res) {
    req.query.user_id = req.user.user_id
    const requestDetails = common.sanitize(req.query, schemas.getAllExpense, constants.moduleNames.expenses)
    try {
      if (schemas.validate(requestDetails, schemas.getAllExpense)) {
        const expenseList = await expense.getAllExpenseList(requestDetails)
        res.status(constants.httpStatusCode.success).send({
          code: constants.responseCodes.successfulOperation,
          message: constants.messageKeys.en.msg_success,
          data: expenseList
        })
      } else {
        return res.status(constants.httpStatusCode.success).send({
          code: constants.responseCodes.revalidation,
          message: constants.messageKeys.en.msg_revalidate
        })
      }
    } catch (error) {
      res.status(constants.httpStatusCode.success).send({
        code: constants.responseCodes.failedOperation,
        message: error.message
      })
    }
  }

  exports.expenseSummery = async function (req, res) {
    const requestDetails = common.sanitize(req.query, schemas.expenseSummery, constants.moduleNames.expenses)
    req.query.user_id = req.user.user_id 
    try {
        if (schemas.validate(requestDetails, schemas.expenseSummery)) {
          const expenseSummery = await expense.expenseSummery(requestDetails)
          res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: constants.messageKeys.en.msg_success,
            data: expenseSummery
          })
        } else {
          return res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.revalidation,
            message: constants.messageKeys.en.msg_revalidate
          })
        }
      } catch (error) {
        res.status(constants.httpStatusCode.success).send({
          code: constants.responseCodes.failedOperation,
          message: error.message
        })
      }
  }

  exports.chartDetails = async function (req, res) {
    const requestDetails = req.user.user_id
    console.log(requestDetails);
    
    try {
          const chartDetails = await expense.chartDetails(requestDetails)
          res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: constants.messageKeys.en.msg_success,
            data: chartDetails
          })
      } catch (error) {
        res.status(constants.httpStatusCode.success).send({
          code: constants.responseCodes.failedOperation,
          message: error.message
        })
      }
  }
