const constants = require('./constants')
const config = require('../configurations/config')
const _ = require('lodash')

const sanitize = function(object , schema , modelName){
    const schemaKeys = _.keys(schema.properties)
    const objectKeys = _.keys(object)
    const constantsValues = _.values(constants.keys)
    for (const key in objectKeys) {
        let isValueMatched = false
        for (const index in constantsValues) {
            if (constantsValues[index].indexOf(objectKeys[key].substring(0, constantsValues[index].length)) === 0) {           
                isValueMatched = true
                break
            }
        }         
        if(!isValueMatched && schemaKeys.indexOf(objectKeys[key])=== -1 ) {
            delete object[objectKeys[key]]
        } else {
            const propertyList = _.keys(schema.properties[objectKeys[key]])
            for (let index = 0; index < propertyList.length; index++) {
                if (propertyList[index] === '$ref') {
                    const refValue = schema.properties[objectKeys[key]]
                    let schemas = require('../modules/' + modelName + '/' + modelName + '-schema')
                    const refSchema = refValue.$ref.substring(1, refValue.$ref.length)
                    sanitize(object[objectKeys[key]], schemas[refSchema])
                }
            }
        }
    }
    return object
}


module.exports = {
    sanitize: sanitize
}