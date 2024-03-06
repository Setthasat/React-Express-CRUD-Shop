import { useState, FormEvent } from "react";
import axios from "axios";

interface ProductData {
    productId: string;
    productName: string;
    productPrice: number;
    productStock: number;
    // Add other properties if needed
}
// Define the props interface for ProductSingleCard
interface ProductSingleCardProps {
    product: ProductData;
    userId: string;
}

function ProductSingleCard({ product, userId }: ProductSingleCardProps) {

    const [amount, setAmount] = useState(1);

    const addAmount = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (product.productStock > amount) {
            setAmount(prevAmount => prevAmount + 1);
        }
    };

    const decreaseAmount = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (amount > 1) {
            setAmount(prevAmount => prevAmount - 1);
        }
    };

    const handleBuy = async () => {
        try {
            const response = await axios.post('http://localhost:8888/buyProduct', {
                _id: userId,
                productId: product.productId,
                quantity: amount
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error buying product:', error);
        }
        window.location.reload();
    };

    return (
        <div className="h-[10rem] w-[10rem] flex mx-3 flex-col justify-center items-center mt-[2rem] bg-white bg-opacity-35 font-bold text-[1rem] border-white border-[1px] text-white rounded-3xl">
            <h2>{product.productName}</h2>
            <p>Price : {product.productPrice.toFixed(2)}</p>
            <p>Stock : {product.productStock}</p>
            <div className="w-[7rem] flex justify-center mt-4  gap-6 bg-white/60 rounded-3xl">
                <button onClick={decreaseAmount}>-</button>
                <span>{amount}</span>
                <button onClick={addAmount}>+</button>
            </div>
            <button className="mt-4" onClick={handleBuy}>buy</button>
        </div>
    );
}

export default ProductSingleCard;
