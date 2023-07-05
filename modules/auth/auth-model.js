const sqlInstance = require('../../database/mysql')
const encryption = require('../../utils/encryption')
const constants = require('../../utils/constants')
const auth = function (){}
const common = require('../../utils/common')

auth.userRegistration = async (requestData) => {
try{
    const hashed = encryption.getEncryptedPassword(requestData.password)
    const user = await sqlInstance.sequelize.models.users.create({...requestData , password : hashed.password + ':' + hashed.salt})   
    console.log(user);
    if(user){
       let tokenDetails ={
        user_id: user.user_id,
        email: user.email
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

auth.verifyToken = async(requestData) => {
    try{

    }catch(error){
        throw new Error(error)
    }
}


module.exports = auth