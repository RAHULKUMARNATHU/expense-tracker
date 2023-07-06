const sqlInstance = require('../../database/mysql')
const encryption = require('../../utils/encryption')
const constants = require('../../utils/constants')
const common = require('../../utils/common')
const emailService = require('../../utils/mailer')
const auth = function (){}

auth.userRegistration = async (requestData) => {
try{
    const hashed = encryption.getEncryptedPassword(requestData.password)
    const user = await sqlInstance.sequelize.models.users.create({...requestData , password : hashed.password + ':' + hashed.salt})   
    if(user){
       let tokenDetails ={
        user_id: user.user_id,
       } 
    const token = await common.generateToken(tokenDetails)
    const link = `http://localhost:3000/auth/setPassword/${user.user_id}/${token}`;
    const sendMail = await emailService.verifyUser(user.email, link )
       return true
    }
    return false

}catch(error){
    if(error.name.toLowerCase() === 'sequelizeuniqueconstrainterror'){
    throw new Error(constants.messageKeys.en.msg_usr_already_exits)
    }
    throw new Error(error)
}
}

auth.verifyUser = async(requestData) => {
    try{
        const user = await sqlInstance.sequelize.models.users.findOne({
            where:{
                user_id:requestData.user_id
            }
        })
        if(user.is_verified === false){
            user.is_verified = true;
            user.save(user)
            return true;
        }
        return false;
    }catch(error){
        throw new Error(error)
    }
}

auth.login = async (requestData) => {
    try{
    const user = await sqlInstance.sequelize.models.users.findOne({where:{email:requestData.username }})
    if(user.is_verified){
        const isMatched = encryption.validatePassword(requestData.password , user.password)
        if(isMatched){
            let tokenDetails= {user_id :user.user_id }
            return common.generateToken(tokenDetails)
        }else{
            return false 
        }
    }else{
        return false
    }
}catch(error){
    throw new Error(error)
}
}

module.exports = auth