const sqlInstance = require('../../database/mysql')
const encryption = require('../../utils/encryption')
const constants = require('../../utils/constants')
const auth = function (){}
const common = require('../../utils/common')

auth.userRegistration = async (requestData) => {
try{
    const hashed = encryption.getEncryptedPassword(requestData.password)
    const user = await sqlInstance.sequelize.models.users.create({...requestData , password : hashed.password + ':' + hashed.salt})   
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
    const user = await sqlInstance.sequelize.models.findOne({
        where:{
            email:requestData.username
        }
    })
    if(user){
        const isMatched = bcrypt.compare(requestData.password , user.password)
        console.log(isMatched);
    }
}

module.exports = auth