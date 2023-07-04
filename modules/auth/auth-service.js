

const signUp = async function(req , res ){
    try{
        const reqData = common.sanitize(req.body , schema.createUser)
        console.log('hello from services');
        return 'hello from services'
    }catch(e){
        console.log(e.error);
    }
}

module.exports = {
    signUp
}