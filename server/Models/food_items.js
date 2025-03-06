const mongoose = require('mongoose')

const { Schema } = mongoose;

const food_itemsSchema = new Schema({
    id: String,
    CategoryName: String,
    name: String,
    img: String,
    options: {
        type: Array
    }

});

module.exports = mongoose.model('food_items', food_itemsSchema)