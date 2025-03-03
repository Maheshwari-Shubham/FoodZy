const mongoose = require("mongoose");

const mongoURI =
    "mongodb+srv://goFood:goFood@cluster0.qiups.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        // Fetching collection properly
        const db = mongoose.connection.db;
        const fetched_data = await db.collection("food_items").find({}).toArray();
        // global.food_items = fetched_data;
        // console.log(); // Now it will log the data properly // "Food Items:", fetched_data
        const catData = await db.collection("foodCategory").find({}).toArray();
        global.food_items = fetched_data;
        global.foodCategory = catData;
        console.log();
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

module.exports = mongoDB;
