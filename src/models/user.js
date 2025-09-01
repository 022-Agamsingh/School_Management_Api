
import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
    name: { 
        type: String, required: true
    },
   
    email: { 
        type: String, required: true, 
        unique: true ,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email format");
            }
        }
        
        
    },
    password: { 
        type: String, required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be strong");
            }
        }
    }
});

const User = mongoose.model("User", userSchema);
export default User;
