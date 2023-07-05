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
    msg_usr_already_exits:'User Already Exist'
    }
 },
 moduleNames: {
    models:"models",
    users: "auth"
 },

 }

 module.exports = constants