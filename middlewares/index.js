const bodyParser = require('body-parser')
const config = require('../configurations/config')
const constants = require('../utils/constants')
const jwt  = require('jsonwebtoken')



module.exports = function(app){
 // Enable request body parsing
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: config.get('server.bodyParser.limit')
  }))

  // Enable request body parsing in JSON format
  app.use(bodyParser.json({
    limit: config.get('server.bodyParser.limit')
  }))
   // verify token
   app.use( verifyToken, function (req, res, next) {
    if (req.isAuthenticatedUser) {
      next()
    } else {
      return res.status(constants.httpStatusCode.success).send({
        code: constants.responseCodes.unauthorizedAccess,
        message: constants.messageKeys.en.msg_unauthorized_user
      })
    }
  }) 

}

 const verifyToken = (req ,res , next) => {
    if(req.headers.authorization && constants.publicAPI.indexOf(req.path) < 0){
      const token = req.headers.authorization
      const userId = jwt.decode(token) ? jwt.decode(token).user_id : ""
      if(userId){
        checkValidUserToken(token , userId , req , next)
      }else
        req.isAuthenticatedUser = false
        next()

      }
      else if(constants.publicAPI.indexOf(req.path) >= 0){
        if(req.headers.authorization === constants.publicAccessToken.token){
          req.isAuthenticatedUser = true
          next()
        }else{
          req.isAuthenticatedUser = false
          next()
        }
      }else {
      req.isAuthenticatedUser = false
      next()
    }

}


const checkValidUserToken = async(token , userId , req , next) => {
  if(token){
  const status =  verifyUserToken(token)
  if(status === constants.httpStatusCode.success){
    const userDetails = await sqlInstance.sequelize.model.users.findOne({
      where:{
        user_id: userId
      }
    },{
      raw: true
    })
    if(userDetails.isVerified) {
      req.isAuthenticatedUser = true
      userDetails = JSON.parse(JSON.stringify(userDetails))
      delete userDetails.password
      req.user = userDetails
      next()
    }else{
      req.isAuthenticatedUser = false
      next()
    }
  }
  }else{
    req.isAuthenticatedUser =false
    next()
  }
}


const verifyUserToken = async (token) => {
 const payload = await jwt.verify(token ,config.get("JWT_TOKEN.SECRET"), { expiresIn:  config.get('JWT_TOKEN.ExpireTime')} )
  if(payload){
    return (null, constants.httpStatusCode.success)
  }else{
   return (constants.messageKeys.en.msg_session_expired, constants.httpStatusCode.forbidden)
  }

}