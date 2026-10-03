const mongoose = require("mongoose");

const mongoDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be configured");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
};

module.exports = mongoDB;
