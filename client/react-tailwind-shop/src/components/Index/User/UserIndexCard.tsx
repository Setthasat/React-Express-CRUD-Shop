import { useEffect, useState } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import './UserIndexCard.css';

// Define the prop type
interface UserData {
    [x: string]: any;
    userId: string;
    userName: string;
    userAge: number;
    userWallet: number;
}

// Define the props interface for UserIndexCard
interface UserIndexCardProps {
    userData: UserData | null;
}

function UserIndexCard({ userData }: UserIndexCardProps) {

    console.log(userData);
    return (
        <div className='w-[35rem] h-[40rem] flex-col justify-center bg-white/50 rounded-lg shadow-md backdrop-blur-sm'>
            <div className='h-auto w-auto flex justify-center items-center'>
                <motion.div
                    className='mt-[6rem] bg-white/50 shadow-2xl text-white  border-white border-[2.5px] p-12 flex justify-center items-center rounded-full'
                    whileHover={{ scale: 1.05, rotate: 360, transition: { duration: 0.3 } }}
                >
                    <FaUserAlt size={75} />
                </motion.div>
            </div>
            <div className='mt-[8rem] p-4 h-auto'>
                {userData ? ( // Check if userData is not null
                    <div className='grid justify-center items-center font-bold -mt-[4rem] text-white'>
                        <p className='flex justify-center items-center text-5xl mb-[2rem]'>{userData.data.userName}</p>
                        <p className='flex justify-center items-center text-3xl'>Money: {userData.data.userWallet}</p>
                    </div>
                ) : (
                    <p className='flex justify-center items-center text-white text-xl'>No user data available</p>
                )}
            </div>
        </div>
    );
}

export default UserIndexCard;
