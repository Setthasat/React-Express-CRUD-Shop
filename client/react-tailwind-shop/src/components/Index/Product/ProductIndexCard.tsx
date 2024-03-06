// ProductIndexCard.tsx
import React from "react";
import ProductSingleCard from "./ProductSingleCard/SingleCard";

interface ProductData {
    productId: string;
    productName: string;
    productPrice: number;
    data: any; // Assuming 'data' contains an array
}



interface ProductIndexCardProps {
    productData: ProductData;
    userId: string;
}

function ProductIndexCard({ productData, userId }: ProductIndexCardProps) {
    // Assuming productData.data is an array, you can map over it
    const { data } = productData;

    return (
        <div className="w-[35rem] h-[40rem] grid grid-cols-3 justify-center bg-white/50 rounded-lg gap-y-[-3rem] gap-x-[5px] shadow-md backdrop-blur-sm">
            {Array.isArray(data) && data.length > 0 ? (
                data.map((product: any) => (
                    <ProductSingleCard
                        key={product.productId}
                        product={product}
                        userId={userId}
                    />
                ))
            ) : (
                <p className="flex justify-center w-[35rem] text-white text-[2rem] items-center">No products available</p>
            )}
        </div>
    );
}

export default ProductIndexCard;
