const { ObjectId } = require('mongoose').Types;

class Shop {
    constructor(UserModel, ProductModel) {
        this.UserModel = UserModel;
        this.ProductModel = ProductModel;
    }

    //==========================================USER==========================================\\

    getAllUser = async (req, res) => {
        try {
            const users = await this.UserModel.find();
            const BaseResponseInst = new BaseResponse(200, "success", users);
            const response = BaseResponseInst.buildResponse();
            return res.json(response).status(200);
        } catch (err) {
            console.log(err);
        }
    };

    createUser = async (req, res) => {
        const BaseResponseInst = new BaseResponse();
        const { userId, userName, userAge, userWallet } = req.body;

        if (!userId || !userName || !userAge || !userWallet) {
            BaseResponseInst.setValue(400, "Missing required fields", null);
            return res.status(400).json(BaseResponseInst.buildResponse());
        }

        const userData = {
            userId: userId,
            userName: userName,
            userAge: userAge,
            userWallet: userWallet
        };

        try {
            const existingUser = await this.UserModel.findOne({ userName });
            if (existingUser) {
                BaseResponseInst.setValue(400, "name is already in use", null);
                return res.status(400).json(BaseResponseInst.buildResponse());
            }
            const newUser = await this.UserModel.create(userData);
            BaseResponseInst.setValue(201, "User created successfully", newUser);
            return res.status(201).json(BaseResponseInst.buildResponse());
        } catch (err) {
            console.log(`Something went wrong: ${err}`);
            BaseResponseInst.setValue(500, "Internal Server Error", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };

    findUserById = async (req, res) => {
        const { userId } = req.params; // Assuming userId is passed in the request params

        try {
            // Find the user by their ID
            const user = await this.UserModel.findById(userId);

            // If the user does not exist, return a 404 Not Found response
            if (!user) {
                const BaseResponseInst = new BaseResponse(404, "User not found", null);
                return res.status(404).json(BaseResponseInst.buildResponse());
            }

            // Return the user details in the response
            const BaseResponseInst = new BaseResponse(200, "User found", user);
            return res.status(200).json(BaseResponseInst.buildResponse());
        } catch (err) {
            // If an error occurs, log the error and return a 500 Internal Server Error response
            console.log(`Error finding user by ID: ${err}`);
            const BaseResponseInst = new BaseResponse(500, "Internal Server Error", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };

    addMoneyToWallet = async (req, res) => {
        const { userId, amount } = req.body;

        try {
            const user = await this.UserModel.findOne({ userId });

            if (!user) {
                const BaseResponseInst = new BaseResponse(404, "User not found", null);
                return res.status(404).json(BaseResponseInst.buildResponse());
            }

            console.log("User wallet:", user.userWallet);
            console.log("Amount to add:", amount);

            user.userWallet += amount;
            await user.save();

            const BaseResponseInst = new BaseResponse(200, "Money added to wallet successfully", user);
            return res.status(200).json(BaseResponseInst.buildResponse());
        } catch (err) {
            console.log(`Error adding money to wallet: ${err}`);
            const BaseResponseInst = new BaseResponse(500, "Internal Server Error", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };

    deleteUser = async (req, res) => {
        const userId = req.params.userId; // Assuming the userId is passed as a URL parameter

        try {
            const user = await this.UserModel.findOneAndDelete({ _id: userId });

            if (!user) {
                const BaseResponseInst = new BaseResponse(404, "User not found", null);
                return res.status(404).json(BaseResponseInst.buildResponse());
            }

            const BaseResponseInst = new BaseResponse(200, "User deleted successfully", null);
            return res.status(200).json(BaseResponseInst.buildResponse());
        } catch (err) {
            console.log(`Error deleting user: ${err}`);
            const BaseResponseInst = new BaseResponse(500, "Internal Server Error", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };


    //==========================================PRODUCT==========================================\\

    getAllProduct = async (req, res) => {
        try {
            const products = await this.ProductModel.find();
            const BaseResponseInst = new BaseResponse(200, "success", products);
            const response = BaseResponseInst.buildResponse();
            return res.json(response).status(200);
        } catch (err) {
            console.log(err);
        }
    };

    addProductStock = async (req, res) => {
        const { productId, quantity } = req.body;

        try {
            // Find the product by its productId
            const product = await this.ProductModel.findOne({ productId });

            // If the product does not exist, return a 404 Not Found response
            if (!product) {
                const BaseResponseInst = new BaseResponse(404, "Product not found", null);
                return res.status(404).json(BaseResponseInst.buildResponse());
            }

            product.productStock += quantity;
            await product.save();

            const BaseResponseInst = new BaseResponse(200, "Stock added to product successfully", product);
            return res.status(200).json(BaseResponseInst.buildResponse());
        } catch (err) {
            // If an error occurs, log the error and return a 500 Internal Server Error response
            console.log(`Error adding stock to product: ${err}`);
            const BaseResponseInst = new BaseResponse(500, "Internal Server Error", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };

    deleteProduct = async (req, res) => {
        const productId = req.params.productId;

        try {
            const user = await this.ProductModel.findOneAndDelete({ _id: productId });

            if (!user) {
                const BaseResponseInst = new BaseResponse(404, "User not found", null);
                return res.status(404).json(BaseResponseInst.buildResponse());
            }

            const BaseResponseInst = new BaseResponse(200, "Product deleted successfully", null);
            return res.status(200).json(BaseResponseInst.buildResponse());
        } catch (err) {
            console.log(`Error deleting user: ${err}`);
            const BaseResponseInst = new BaseResponse(500, "Internal Server Error", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };

    addProduct = async (req, res) => {
        const BaseResponseInst = new BaseResponse();
        const { productId, productName, productPrice, productStock } = req.body;

        if (!productId || !productName || !productPrice || !productStock) {
            BaseResponseInst.setValue(400, "Missing required fields", null);
            return res.status(400).json(BaseResponseInst.buildResponse());
        }

        const productData = {
            productId: productId,
            productName: productName,
            productPrice: productPrice,
            productStock: productStock
        };

        try {
            const existingName = await this.ProductModel.findOne({ productName });
            if (existingName) {
                BaseResponseInst.setValue(400, "name is already in use", null);
                return res.status(400).json(BaseResponseInst.buildResponse());
            }
            const newProduct = await this.ProductModel.create(productData);
            BaseResponseInst.setValue(201, "Product added successfully", newProduct);
            return res.status(201).json(BaseResponseInst.buildResponse());
        } catch (err) {
            console.log(`Something went wrong: ${err}`);
            BaseResponseInst.setValue(500, "Internal Server Error", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };

    checkProductStock = async (req, res) => {

        // JSON EX.
        // {
        //     "productId": "609d5be21c35044c74e0f3b2"
        //   }

        try {
            const { productId } = req.body;

            if (!productId) {
                const BaseResponseInst = new BaseResponse(400, "Product ID is required", null);
                return res.status(400).json(BaseResponseInst.buildResponse());
            }
            const product = await this.ProductModel.findOne({ productId }, { productId: 1, productName: 1, productStock: 1 });

            if (!product) {
                const BaseResponseInst = new BaseResponse(404, "Product not found", null);
                return res.status(404).json(BaseResponseInst.buildResponse());
            }

            const BaseResponseInst = new BaseResponse(200, "Product stock information", product);
            return res.status(200).json(BaseResponseInst.buildResponse());
        } catch (err) {
            console.log(`Error checking product stock: ${err}`);
            const BaseResponseInst = new BaseResponse(500, "Internal Server Error", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };



    //==========================================BUSINESS==========================================\\

    buyProduct = async (req, res) => {
        const { _id, productId, quantity } = req.body;

        try {
            const user = await this.UserModel.findOne({ _id });
            const product = await this.ProductModel.findOne({ productId });

            console.log(user, product);

            if (!user) {
                const BaseResponseInst = new BaseResponse(404, "User not found", null);
                return res.status(404).json(BaseResponseInst.buildResponse());
            }

            if (!product) {
                const BaseResponseInst = new BaseResponse(404, "Product not found", null);
                return res.status(404).json(BaseResponseInst.buildResponse());
            }

            console.log("Product Price:", product.productPrice);
            console.log("Quantity:", quantity);
            console.log("User Wallet:", user.userWallet);

            const totalPrice = product.productPrice * quantity;

            console.log("Total Price:", totalPrice);

            if (isNaN(totalPrice) || isNaN(user.userWallet)) {
                const BaseResponseInst = new BaseResponse(400, "Invalid price or wallet value", null);
                return res.status(400).json(BaseResponseInst.buildResponse());
            }

            if (user.userWallet < totalPrice) {
                const BaseResponseInst = new BaseResponse(400, "You don't have enough money", null);
                return res.status(400).json(BaseResponseInst.buildResponse());
            }

            if (product.productStock < quantity) {
                const BaseResponseInst = new BaseResponse(400, "Product out of stock", null);
                return res.status(400).json(BaseResponseInst.buildResponse());
            }

            user.userWallet -= totalPrice;
            product.productStock -= quantity;

            await user.save();
            await product.save();

            const BaseResponseInst = new BaseResponse(200, "Product purchased successfully", {
                user,
                product
            });
            return res.status(200).json(BaseResponseInst.buildResponse());
        } catch (err) {
            console.log(`Error buying product: ${err}`);
            const BaseResponseInst = new BaseResponse(500, "Internal Server Error", null);
            return res.status(500).json(BaseResponseInst.buildResponse());
        }
    };

}


module.exports = Shop;

class BaseResponse {

    constructor(code, description, data) {
        this.code = code;
        this.description = description;
        this.data = data;
    }

    buildResponse() {
        return {
            status: {
                code: this.code,
                description: this.description,
            },
            data: this.data
        };
    }

    setValue(code, description, data) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
}