import React, { useEffect, useState } from 'react';
import ProductIndexCard from '../components/Index/Product/ProductIndexCard';
import UserIndexCard from '../components/Index/User/UserIndexCard';
import axios from 'axios';

function Home() {

    const [userData, setUserData] = useState(null);
    const [productData, setProductData] = useState([]);
    const [userId, setUserId] = useState('65e590b44aed1984514a635c');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const responseUser = await axios.get(`http://localhost:8888/get/findUserById/${userId}`);
                setUserData(responseUser.data); // Assuming the user data is returned directly as response.data

                console.log(responseUser.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const responseProduct = await axios.get('http://localhost:8888/get/all/product');
                setProductData(responseProduct.data);
                console.log(responseProduct.data);
                // Assuming products data is returned directly as response.data
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, []);

    return (
        <div className='from-pink-600 bg-gradient-to-bl to-violet-900 h-screen flex justify-center items-center gap-[5rem]'>
            <UserIndexCard userData={userData} />
            <ProductIndexCard productData={productData} userId={userId} />
        </div>
    );
}

export default Home;
