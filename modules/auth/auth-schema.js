const Validator = require('jsonschema').Validator
const _validator = new Validator()

const schemas = function(){}

schemas.createUser = {
    id: "createUser",
    type:"object",
    properties : {
        first_name: {
            type:"string",
            required:true
        },
        last_name: {
            type:"string",
            required:true
        },
        email: {
            type:"string",
            required:true
        },
        password: {
            type:"string",
            required:true
        }
    }
}


schemas.validate = function(object , schema){
    const errors = _validator.validate(object , schema).errors
    if(errors.length >0){
        console.log('Schema validation failed for id:- %s errors:- %j', schema.id, errors)
    }
    return errors.length <= 0
}
module.exports = schemas