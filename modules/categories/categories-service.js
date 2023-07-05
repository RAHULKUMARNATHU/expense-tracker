const constants = require('../../utils/constants')
const schemas = require('./categories-schema')
const common = require('../../utils/common')
const categories = require('./categories-model')

const createCategory = async function(req , res ){
    try{
        const reqData = common.sanitize(req.body , schemas.createCategory, constants.moduleNames.categories)
        if (schemas.validate(reqData, schemas.createCategory)) {
            const categoryDetails = await categories.createCategory(reqData)
            res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: constants.messageKeys.en.msg_success,
            data: categoryDetails
      })
        }
        else {
        res.status(constants.httpStatusCode.badRequest).send({
        code: constants.responseCodes.revalidation,
        message: constants.messageKeys.en.msg_revalidate
      })
    }
    }catch(error){ 
    res.status(constants.responseCodes.failedOperation).send({
    code: constants.responseCodes.failedOperation,
    message: error.message
    })
  }
}

const getAllCategoryList = async function (req, res) {
    try {
      const requestDetails = common.sanitize(req.query, schemas.getCategories, constants.moduleNames.categories)
      if (schemas.validate(requestDetails, schemas.getCategories)) {
        const categoriesList = await categories.getAllCategoryList(requestDetails)
        res.status(constants.httpStatusCode.success).send({
          code: constants.responseCodes.successfulOperation,
          message: constants.messageKeys.en.msg_success,
          data: categoriesList
        })
      } else {
        res.status(constants.httpStatusCode.badRequest).send({
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

  const updateCategory = async function (req, res) {
    try {
      const requestDetails = common.sanitize(req.body, schemas.updateCategory, constants.moduleNames.categories)
      
      if (schemas.validate(requestDetails, schemas.updateCategory)) {
        const categoryDetails = await categories.updateCategory(requestDetails)
        res.status(constants.httpStatusCode.success).send({
          code: constants.responseCodes.successfulOperation,
          message: constants.messageKeys.en.msg_success,
          data: categoryDetails
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
    createCategory,
    getAllCategoryList,
    updateCategory
}