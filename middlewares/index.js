const bodyParser = require('body-parser')
const config = require('../configurations/config')




module.exports = function(app){

    // Enable request body parsing
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: config.get('server.bodyParser.limit')
  }))

  // Enable request body parsing in JSON format
  app.use(bodyParser.json({
    limit: config.get('server.bodyParser.limit')
  }))
}