import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import path from 'path';

dotenv.config({ path: path.resolve('.env') });

console.log({ path: path.resolve('.env') });


console.log(process.env.MONGO_URI);
const dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("connect db"))
    .catch((err)=>console.log(err , "error db"))
}

export default dbConnect