const express = require('express');
const mongoose = require('mongoose');
const{createHmac,randomBytes}=require("crypto");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: 'I love coding!'
    },
    role: {
        type: String,
        default: 'Developer',
        
        
    },
    skills: {
        type: [String]
    },
    profileImage: {
        type: String,
        default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    },
    githubLink: {
        type: String
    },

    
}, { timestamps: true });
userSchema.pre("save",function(next){
   const user=this;
   if(!user.isModified("password")) return next();
   const salt=randomBytes(16).toString("hex");
   const hashpass=createHmac("sha256",salt)
   .update(user.password)
   .digest("hex");
   this.salt=salt,
   this.password=hashpass;
   next();

})
userSchema.statics.matchPassword=async function (email,password) {
    const user=await this.findOne({email});
    if(!user) {
       return null;

    }
    const salt=user.salt;
    const hashpass=user.password;
    const userProvideHash=createHmac("sha256",salt)
    .update(password)
    .digest("hex");
    if(userProvideHash!==hashpass) return null;
    return user;


}
module.exports = mongoose.model('user', UserSchema);