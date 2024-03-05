const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        require: true,
    },
    userAge: {
        type: Number,
        require: true
    },
    userWallet: {
        type: Number,
        require: true
    }
});

const ProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    productPrice: {
        type: Number,
        require: true
    },
    productStock: {
        type: Number,
        require: true
    }
});

const ProductModel = mongoose.model("products", ProductSchema);
const UsersModel = mongoose.model("users", UsersSchema);

module.exports = { UsersModel, ProductModel };