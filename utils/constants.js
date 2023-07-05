const expenses = require("../models/expenses")

const constants = {
httpStatusCode: {
    success: 200,
    unauthorized: 401,
    forbidden: 403,
    badRequest: 400,
    failedOperation: 500
  },
 responseCodes :{
    successfulOperation : 200,
    unauthorizedAccess : 401,
    failedOperation: 500,
    revalidation: 400,
    noContent: 204,
    forbidden: 403,
    notFound : 404
 },
 messageKeys:{
    en: {
    msg_success: 'Successful Operation',
    msg_failed: 'Something went wrong',
    msg_revalidate: 'Schema Validation Failed',
    msg_user_unauthorized_access: 'Unauthorized Access',
    msg_no_data: 'No Data Found',
    msg_usr_already_exits:'User Already Exist',
    msg_session_expired:'User Session Expired', 
    msg_unauthorized_user:'UnAuthorized User',
    msg_data_already_exits:'Data Already Exist'
   }
 },

 publicAPI:[
   '/user/signup',
   '/user/verify',
   '/user/login'
 ],
 limit:15,
 publicAccessToken:{
  token:'3ls20684-3fb7-9327-8392-3ps920t92746'

  },

 moduleNames: {
    models:"models",
    users: "auth",
    categories: "categories",
    expenses: 'expenses'
 },

 }

 module.exports = constants