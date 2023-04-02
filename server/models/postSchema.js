"use strict";

const mongoose = require('mongoose');
require('mongoose-type-email');

const postSchema = mongoose.model("postSchema", new mongoose.Schema({
	userid: { type: String, allowNull: false, required: [true, 'userid is required'] },
    description: {type: String, allowNull: false, required: [true, 'description  is required ']},
    likes:[],
    // createdAt:{type:Date},
    image: {type: String, allowNull: true },
    
}, { timestamps: true }));
// const doc = new postSchema();
module.exports = postSchema;



