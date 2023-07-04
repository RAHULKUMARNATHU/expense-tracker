const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const sequelizeTransforms = require('sequelize-transforms')
const constants = require('../utils/constants')
const config = require('../configurations/config')
const db = {}
const sequelize = new Sequelize(config.get('mysql.database'), config.get('mysql.username'), config.get('mysql.password'), config.get('mysql'))

sequelizeTransforms(sequelize)

// To Read All Files from the database directory and we will exclude index.js from the directory
fs.readdirSync(path.join(__dirname, '../' + constants.moduleNames.models + '/')).forEach(function (file) {
  const model = require(path.join(__dirname, '/../' + constants.moduleNames.models + '/' + file))(sequelize, Sequelize.DataTypes)
  db[model.name] = model
})

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// verify the connection
sequelize.authenticate().then(() => {
  console.log('My SQL Database Connection is established Successfully.')
}).catch((error) => {
  console.log('Error While Connecting To the My SQL Database. Error: %j', error)
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
