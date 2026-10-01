const mongoose = require("mongoose");

const mongoDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be configured");
    }

    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db;
    const foodItems = await db.collection("food_items").find({}).toArray();
    const foodCategories = await db.collection("foodCategory").find({}).toArray();

    global.food_items = foodItems;
    global.foodCategory = foodCategories;
    console.log("Connected to MongoDB and loaded food data");
};

module.exports = mongoDB;
