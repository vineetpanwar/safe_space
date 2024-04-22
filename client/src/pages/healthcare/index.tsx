import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import SafeSpaceLogoBanner from '../../../components/SafeSpaceLogoBanner';
import { FaAngleRight } from "react-icons/fa";
import { useAuth } from '@/context/AuthContext';

const Healthcare: FC = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    //   if (!isLoggedIn()) {
    //     router.push('/login');
    //   }
  })

  return (
    <div className="flex flex-col items-center justify-start pt-20 min-h-screen py-2 bg-gradient-to-r from-background-start-rgb to-background-end-rgb">
      <SafeSpaceLogoBanner />
      <h1 className="text-4xl text-foreground-rgb text-center my-6 mt-[5rem]">Welcome to Healthcare Professional Dashboard</h1>
      <p className="text-xl text-center mt-[1rem] px-[10rem]">{`Please select an option to edit`}</p>
      <button 
        className="btn btn-lg btn-outline mt-[5rem] w-[50%] text-[#fff] hover:bg-[#230C59] hover:text-[#fff] hover:border-[#fff]" 
        onClick={() => {router.push('/healthcare/assessment');}}
      >
        Create / Update / Delete Assessments <FaAngleRight className='ml-auto'/>
      </button>
      <button 
        className="btn btn-lg btn-outline mt-[2rem] w-[50%] text-[#fff] hover:bg-[#230C59] hover:text-[#fff] hover:border-[#fff]" 
        onClick={() => {router.push('/healthcare/resources');}}
      >
        Create / Update / Delete Resources <FaAngleRight className='ml-auto'/>
      </button>
    </div>
  );
};

export default Healthcare;