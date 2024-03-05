const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 8888;

const Shop = require('./Controller/main');
const { UsersModel, ProductModel } = require('./model/model');

app.use(cors());
app.use(express.json());

dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected ...');
    } catch (err) {
        console.error(err);
    }
})();

const ShopInst = new Shop(UsersModel, ProductModel);
// user
app.get('/get/all/user', ShopInst.getAllUser);
app.get('/get/findUserById/:userId', ShopInst.findUserById);
app.post('/create/user', ShopInst.createUser);
app.post('/addMoney', ShopInst.addMoneyToWallet);
app.delete(`/user/:userId`, ShopInst.deleteUser);
// product
app.get('/get/all/product', ShopInst.getAllProduct);
app.post('/check/ProductStock', ShopInst.checkProductStock);
app.post('/create/product', ShopInst.addProduct);
app.post('/addStock/product', ShopInst.addProductStock);
app.delete('/product/:productId', ShopInst.deleteProduct);
// business
app.post('/buyProduct', ShopInst.buyProduct);


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});