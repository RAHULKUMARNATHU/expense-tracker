const Validator = require('jsonschema').Validator
const _validator = new Validator()
const {MESSAGES , REGEX} = require('../../utils/regex.util')
const schemas = function(){}

/*schema for signup */
schemas.createUser = {
    id: "createUser",
    type:"object",
    properties : {
        first_name: {
            type:"string",
            required:true,
            message:"First name should be of type string"
        },
        last_name: {
            type:"string",
            required:true,
            message:"Last name should be of type string"
        },
        email: {
            type:"string",
            required:true,
            pattern: REGEX.EMAIL_FORMAT,
            message:MESSAGES.EMAIL_FORMAT_MESSAGE

        },
        password: {
            type:"string",
            required:true,
            pattern: REGEX.PASSWORD_RULE,
            message:MESSAGES.PASSWORD_RULE_MESSAGE
        }
    }
}

/*Schema for verify user  */
schemas.verifyUser = {
    id:'/verify',
    type:'object',
    properties:{
        token :{
            type:'string',
            required:true
        }
    }
}

/*Login schema */
schemas.login = {
    id:'/login',
    type:'object',
    properties:{
        username:{
            type:'string',
            required:true
        },
        password:{
            type:'string',
            required:true
        }
    }
}

/*schema to validate is valid or not  */
schemas.validate = function(object , schema){
    const errors = _validator.validate(object , schema).errors
    if(errors.length >0){
        return errors.map((error) => {
        return error.schema.message
    })
    }
    return errors
}
module.exports = schemas