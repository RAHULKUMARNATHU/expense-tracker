const express = require('express')
const config = require('./configurations/config')
// const util = require('util')
const routes = require('./routes/index')
const db = require('./database/mysql')
const app = express()
const middlewares = require('./middlewares/index')



// setup middlewares
middlewares(app)

routes(app)
// Function Call To Sync App Database Tables Before the Start of the Application
db.sequelize.sync(
    {alter: false}
).then((status) =>{
    console.log('My SQL Tables Synced Successfully.');
app.listen(process.env.PORT || config.get('server.port'),()=>{
console.log(`server is running Happily !`, process.pid , config.get('server.port') )
})
}).catch((error) => {
    console.log("sync catch, error: ", error)
})

app.timeout = config.get('server.timeout')

process.on('uncaughtException',function(e){
    console.log('uncaught exception', e.stack);
    
})