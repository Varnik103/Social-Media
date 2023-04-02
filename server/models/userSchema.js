"use strict";

const mongoose = require('mongoose');
// require('mongoose-type-email');

const userSchema = mongoose.model("userSchema", new mongoose.Schema({
	username: { type: String, allowNull: false, required: [true, 'username is required'] },
    password: {type: String, allowNull: false, required: [true, 'password  is required minimum 8 characters']},
    firstname: { type: String, allowNull: false, required: [true, 'firstname is required'] },
    lastname: { type: String, allowNull: false, required: [true, 'lastname is required'] },
    isAdmin:{type: Boolean,default:false},
    profilePicture:{type: String},
    coverPicture:{ type: String},
    livesIn:{type:String},
    worksAt: { type:String},
    followers:[],
    following:[],

}, { timestamps: true }));
// const doc = new userSchema();
module.exports = userSchema;



