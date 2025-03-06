const mongoose = require('mongoose')

const { Schema } = mongoose;

const foodCategorySchema = new Schema({
    id: String,
    CategoryName: String

});

module.exports = mongoose.model('foodCategory', foodCategorySchema)