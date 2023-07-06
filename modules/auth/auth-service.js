const constants = require('../../utils/constants')
const schemas = require('./auth-schema')
const common = require('../../utils/common')
const auth = require('./auth-model')

module.exports.signUp = async (req , res ) => {
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

module.exports.verifyUser = async(req , res) => {
try{
  const reqData = common.sanitize(req.body , schemas.verifyUser,  constants.moduleNames.users)
   if (schemas.validate(reqData, schemas.verifyUser)) {
    const data = await common.decryptToken(req.body.token)
    const authDetails = await auth.verifyUser(data)
    res.status(constants.httpStatusCode.success).send({
    code: constants.responseCodes.successfulOperation,
    message: constants.messageKeys.en.msg_success,
    data: authDetails
    })
   }else{
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

module.exports.login = async (req , res) => {
  try{
    const reqData = common.sanitize(req.body, schemas.login , constants.moduleNames.users)
    if(schemas.validate(reqData , schemas.login)){
    const authDetails = await auth.login(reqData)
    if(authDetails){
    res.status(constants.httpStatusCode.success).send({
    code: constants.responseCodes.successfulOperation,
    message: constants.messageKeys.en.msg_success,
    data: authDetails
    })
    }res.status(constants.httpStatusCode.unauthorized).send({
    code: constants.responseCodes.unauthorizedAccess,
    message: constants.messageKeys.en.msg_unauthorized_user
    })
    }else{
    res.status(constants.httpStatusCode.badRequest).send({
    code: constants.responseCodes.revalidation,
    message: constants.messageKeys.en.msg_revalidate
    })
  }
  }catch(error){
    res.status(constants.responseCodes.failedOperation).send({
      code:constants.responseCodes.failedOperation,
      message:error.message
    })
  }
}

