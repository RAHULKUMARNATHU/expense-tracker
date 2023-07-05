const bcrypt = require('bcrypt')

const getEncryptedPassword = function(password){
    const salt = bcrypt.genSaltSync(10)
    const passwordHashWithSalt = bcrypt.hashSync(password , salt)
    const passwordHash = passwordHashWithSalt.substring(29)
    return {
        password:passwordHash,
        salt : salt
    }
}


module.exports = {
    getEncryptedPassword : getEncryptedPassword
}