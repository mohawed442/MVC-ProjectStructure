import mongoose, { Schema , model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength : 3 ,
    maxlength : 25 ,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default : "male"
  },
  address: {
    type: String,
  },
  image:String,
  confirmEmail: {
    type: Boolean,
    default: false
  },
  role:{
    type: String,
    enum: ['user', 'admin'],
    default : "user"
  }
},{timestamps : true})


const userModel = mongoose.models.User || model("User", userSchema) ;
export default userModel