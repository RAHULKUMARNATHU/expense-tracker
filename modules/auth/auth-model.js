const sqlInstance = require('../../database/mysql')
const encryption = require('../../utils/encryption')
const constants = require('../../utils/constants')
const auth = function (){}


auth.userRegistration = async (requestData) => {
try{
    const hashed = encryption.getEncryptedPassword(requestData.password)
    console.log(hashed.password + ':' + hashed.salt);
    const data = await sqlInstance.sequelize.models.users.create({...requestData , password : hashed.password + ':' + hashed.salt})   

    return data ;
}catch(error){
    if(error.name.toLowerCase() === 'sequelizeuniqueconstrainterror'){
    throw new Error(constants.messageKeys.en.msg_usr_already_exits)
    }
    throw new Error(error)
}
}


module.exports = auth