const express = require('express')
const router = express.Router()
const foodCategory = require('../Models/foodCategory')
const food_items = require('../Models/food_items')
router.post('/foodData', async (req, res) => {
    try {
        //console.log(global.food_items)
        const fetched_data = await food_items.find({}).toArray();
        // global.food_items = fetched_data;
        // console.log(); // Now it will log the data properly // "Food Items:", fetched_data
        const catData = await foodCategory.find({}).toArray();
        //global.food_items = fetched_data;
        //global.foodCategory = catData;
        //console.log();
        res.send([fetched_data, catData])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
    }
})
module.exports = router;