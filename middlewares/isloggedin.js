
const jwt = require("jsonwebtoken")
module.exports.authenticateToken = (req, res, next)=> {
    const token = req.cookies.token; ;
    if (!token) return res.status(401).json({message:"Unauthorized person"});
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }