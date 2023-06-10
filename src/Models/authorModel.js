const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  fname: { 
    type: String,
     required: true,
     trim: true
    },
  lname: { 
    type: String,
     required: true,
     trim: true
    },
  title: { 
    type: String,
    enum: ['Mr', 'Mrs', 'Miss'],
    required: [true, "title should be given"]},
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
    },

},{timestamps:true});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;



// email: {
//   type: String,
//   required: true,
//   unique: true,
  // validate: {
  //     validator: function (v) {
  //         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
  //     },

  //     message: "Please enter a valid email"

  // },
// }
