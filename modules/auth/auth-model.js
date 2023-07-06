const sqlInstance = require('../../database/mysql')
const encryption = require('../../utils/encryption')
const constants = require('../../utils/constants')
const common = require('../../utils/common')
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
       return token
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
        if(user.isVerified === false){
            user.isVerified = true;
            user.save(user)
            return true;
        }
        return false;
    }catch(error){

        throw new Error(error)
    }
}

auth.login = async (requestData) => {
    const user = await sqlInstance.sequelize.models.users.findOne({where:{email:requestData.username }})
    if(user){
        const isMatched = encryption.validatePassword(requestData.password , user.password)
        if(isMatched){
            let tokenDetails= {user_id :user.user_id}
            return common.generateToken(tokenDetails)
        }else{
            return false 
        }
    }else{
        return false
    }
}

module.exports = auth