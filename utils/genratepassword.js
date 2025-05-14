const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports.genratepassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)
    return hash;
}

module.exports.jwtToken =async (password)=>{
    if(password){
        const token = jwt.sign(password, process.env.JWTPRIVATEKEY)
        return token;
    }
}

module.exports.verfyjwttoken = async(token)=>{
    if(token){
        const decode = jwt.verify(token, process.env.JWTPRIVATEKEY)
        return decode;
    }

}

module.exports.comparepassword = async(password, hased)=>{
    if(password && hased){
        const match = await bcrypt.compare(password, hased);
        return match;
    }
    
}