const jwt = require("jsonwebtoken");
const authorModel= require('../Models/authorModel')
require('dotenv').config()

const authMiddleware =  (req, res, next) => {
  try {
  const token = req.headers["x-api-key"];
  if (!token) {
  return res.status(401).json({ error: "Access denied. Token missing." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async function(err, decoded){
    if (err) {
            return res.status(401).send({ status: false, msg: "Invalid Token" });
        }
        else {       
  const authorId = await authorModel.findById(decoded.authorId)
  if(!authorId) return res.status(401)
  .json({status: false, msg: "author not login"})

  req["x-api-key"] = decoded
  next();

  }});

  } catch (error) {
  res.status(500).json({ error: error.message });
  }
};

module.exports = {authMiddleware};
