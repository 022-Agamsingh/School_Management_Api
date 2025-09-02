
import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
userSchema.methods.getJWT = function() {
    const user= this ;

    const token =jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
};
userSchema.methods.validatePassword = async function(inputpassword) {

    const user = this;
    const hashpassword= user.password

    const isvalidpassword = await bcrypt.compare(inputpassword, hashpassword);
    return isvalidpassword;
};

const User = mongoose.model("User", userSchema);
export default User;
