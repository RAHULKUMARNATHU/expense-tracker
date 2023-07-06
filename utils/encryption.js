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


const validatePassword = function (password, hashedPassword) {
  let isValidPassword = false
  const splitValues = hashedPassword.split(':')
  const salt = splitValues[1]
  const hashValue = bcrypt.hashSync(password, salt).substring(29)
  if (hashValue === splitValues[0]) {
    isValidPassword = true
  }
  return isValidPassword
}

module.exports = {
    getEncryptedPassword : getEncryptedPassword,
    validatePassword:validatePassword
}