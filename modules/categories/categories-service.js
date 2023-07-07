const constants = require('../../utils/constants')
const schemas = require('./categories-schema')
const common = require('../../utils/common')
const categories = require('./categories-model')

/*create category */
exports.createCategory = async function(req , res ){
    try{
      req.body.user_id = req.user.user_id
        const reqData = common.sanitize(req.body , schemas.createCategory, constants.moduleNames.categories)
        const validationData = common.validateSchema(reqData, schemas.createCategory);
        if (validationData.length === 0) {
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
        message: validationData
      })
    }
    }catch(error){ 
    res.status(constants.responseCodes.failedOperation).send({
    code: constants.responseCodes.failedOperation,
    message: error.message
    })
  }
}

exports.getAllCategoryList = async function (req, res) {
    try {
       req.query.user_id = req.user.user_id
      const requestDetails = common.sanitize(req.query, schemas.getCategories, constants.moduleNames.categories)
      const validationData = common.validateSchema(requestDetails, schemas.getCategories);
        if (validationData.length === 0) {
        const categoriesList = await categories.getAllCategoryList(requestDetails)
        res.status(constants.httpStatusCode.success).send({
          code: constants.responseCodes.successfulOperation,
          message: constants.messageKeys.en.msg_success,
          data: categoriesList
        })
      } else {
        res.status(constants.httpStatusCode.badRequest).send({
          code: constants.responseCodes.revalidation,
          message: validationData
        })
      }
    } catch (error) {
      res.status(constants.httpStatusCode.success).send({
        code: constants.responseCodes.failedOperation,
        message: error.message
      })
    }
  }

  exports.updateCategory = async function (req, res) {
    try {
      const requestDetails = common.sanitize(req.body, schemas.updateCategory, constants.moduleNames.categories)
      
      const validationData = common.validateSchema(requestDetails, schemas.updateCategory);
      if (validationData.length === 0) {
        const categoryDetails = await categories.updateCategory(requestDetails)
        res.status(constants.httpStatusCode.success).send({
          code: constants.responseCodes.successfulOperation,
          message: constants.messageKeys.en.msg_success,
          data: categoryDetails
        })
      } else {
        res.status(constants.httpStatusCode.badRequest).send({
          code: constants.responseCodes.revalidation,
          message: validationData
        })
      }
    } catch (error) {
      res.status(constants.responseCodes.failedOperation).send({
        code: constants.responseCodes.failedOperation,
        message: error.message
      })
    }
  }