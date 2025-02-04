const jwt = require('jsonwebtoken');
const UserModel = require('../modules/UserModel');
const verifyToken = (req,res,next) =>{
    
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        res.status(401).json({
            message:"Missing Token"
        })
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token,"APPLE",async(err,decode) =>{
        if(err){
            return res.status(403).json({
                message:"Invalid Token"
            })
        }

        const user = await UserModel.findOne({_id:decode.id})

        if(!user){
            return res.status(404).json({
                message:"User Not found"
            })
        }

        req.user = user;
        next();
    })
    
}

module.exports =verifyToken;