const nodemailer = require('nodemailer')

const config = require('../configurations/config')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')



const mailer = function () {}

const transport = nodemailer.createTransport(smtpTransport({
    host: config.get('mailer.host'),
    port: config.get('mailer.port'),
    requireTLS:true,
    auth:{
        user: config.get('mailer.email'),
        pass:config.get('mailer.password')
    },
    tls:{
        ciphers:'SSLv3'
    }
}))

const sendMail = function(mailOption) {
    return new Promise((resolve , reject) =>{
        transport.sendMail(mailOption, function(error , info){
            if(error){
                reject(error)
            }else{
                resolve(info)
            }
        })    
    })
}

mailer.sendMail = function(data){
    return new Promise((resolve , reject) => {
        const mailOptions = {
            from : config.get('mailer.supportMail'),
            to : data.recipientMail,
            html: data.content
        }
        sendMail(mailOptions).then((status) => {
            resolve(true)
        }).catch((error) => {
            reject(error)
        })
    })
}


mailer.verifyUser  = async(to , body) =>{
    const mailSubject = 'verify user link'
    html= `Click <a href = "${link}"> here </a> to verify your email`
    const recipientMail = to

    // const content = t

    const mailOptions = await mailer.sendMail({recipientMail})
}




module.exports = mailer