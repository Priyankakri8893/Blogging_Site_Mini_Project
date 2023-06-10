const authorModel= require('../Models/authorModel')
const jwt = require('jsonwebtoken')
const blogModel = require('../Models/blogModel')
require('dotenv').config()

const isValid = function(value){
  if(typeof value === "undefined"|| value === null) return false
  if(typeof value === "string" && value.trim().length === 0) return false
  return true
} 
// Create a new author
const createAuthor = async (req, res) => {
  try {
  let { fname, lname, title, email, password } = req.body;

  
  if(!isValid(fname) ||!isValid(lname) ||!isValid(title) 
  ||!isValid(email) ||!isValid(password)){
    return res.status(400)
    .send({status:false , message : "all fields are required"})
   }

   if (
    typeof fname !== "string" ||
    typeof lname !== "string" ||
    typeof title !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" 
  ) {
    return res.status(400).send({
        status: false,
      message: "Type is wrong for the fields. They should be strings.",
    });
  }
 
 if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)){
   return res.status(400)
   .send({status:false , message : "Email should be valid email address"})
 }
 
 const emailAreadyExit = await authorModel.findOne({email : email});
 if(emailAreadyExit) {
   return  res.status(400)
   .send({status:false , message : "Email already registered"})
 }
   
     title =  title.trim()
   const vab = ['Mr', 'Mrs', 'Miss']
  if(!vab.includes(title)) return res.status(400)
  .send({status : false , message : "Please provide valid title from these :-'Mr', 'Mrs', 'Miss'"})

  const createdAuthor = await authorModel.create(req.body)
  res.status(201).json({status : true, message : "author created" , data : createdAuthor});
  } catch (error) {
  res.status(500).json({ 
  status: false, message: error.message })
  }
};

// ******************************************************************************* //

const loginAuthor= async (req, res) => {
  try{
  let data = req.body
  if(!data.email ||!data.password) 
  return res.status(400).send({
  status :false, message : "email & password must be needed"})

  let authorEmail= data.email
  let password= data.password
 
  let author= await authorModel.findOne({
  email: authorEmail, password: password
  })
 
  if(!author) return res.status(401).json({
  status: false, msg: "email and password is not correct"
  })
 
  //login successful
  let token= jwt.sign(
  {
  authorId: author._id.toString(),
  group: "group6",
  project: "blogging"
  },
  process.env.JWT_SECRET_KEY,
  )
 
  res.setHeader("x-api-key", token)
  res.status(200).json({status: true, data: {token : token}})
 }catch (err) {
res.status(500).send({
status : false, message : err.message})
}
 }

// ******************************************************************************* //

// Get all authors  :- for testing purpose
const getAllAuthors = async (req, res) => {
try {
const authors = await authorModel.find();
res.status(200).json(authors);
} catch (error) {
res.status(500).json({ status:false , message: error.message });
}
};

module.exports= {createAuthor, loginAuthor}
module.exports.getAllAuthors= getAllAuthors