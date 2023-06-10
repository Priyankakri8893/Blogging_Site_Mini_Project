const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String,
     required: true,
     trim : true
     },
  body: { type: String, 
    required: true,
    trim : true,
   },
  authorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Author',
    required: true 
    },
  tags: [{ 
    type: String, 
    trim: true
  }],
  category: { 
    type: String,
    required: true,
    trim :true
    },
  subcategory: [{ 
    type: String, 
    trim: true
  }],
  deletedAt: { type: Date , default: null},
  isDeleted: { type: Boolean, default: false },
  publishedAt: { type: Date, default: null},
  isPublished: { type: Boolean, default: false },
},{timestamps:true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
