"use strict";

const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = mongoose.model("userSchema", new mongoose.Schema({
	username: { type: String, allowNull: false, required: [true, 'username is required'] },
    password: {type: String, allowNull: false, required: [true, 'password  is required minimum 8 characters']},
    firstname: { type: String, allowNull: false, required: [true, 'firstname is required'] },
    lastname: { type: String, allowNull: false, required: [true, 'lastname is required'] },
    isAdmin:{type: Boolean, allowNull:true,default:false},
    profilePicture:{type: String, allowNull: true},
    coverPicture:{ type: String, allowNull: true },
    livesIn:{type:String,allowNull:false,required:[true,'address is required']},
    worksAt: { type:String, allowNull: true },
    followers:[],
    following:[],

}, { timestamps: true }));
const doc = new userSchema();
module.exports = userSchema;



