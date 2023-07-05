const constants = require('../../utils/constants')
const schemas = require('./auth-schema')
const common = require('../../utils/common')
const auth = require('./auth-model')
const signUp = async function(req , res ){
    try{
        const reqData = common.sanitize(req.body , schemas.createUser,  constants.moduleNames.users,)
        if (schemas.validate(reqData, schemas.createUser)) {
            const authDetails = await auth.userRegistration(reqData)
            res.status(constants.httpStatusCode.success).send({
            code: constants.responseCodes.successfulOperation,
            message: constants.messageKeys.en.msg_success,
            data: authDetails
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

module.exports = {
    signUp
}