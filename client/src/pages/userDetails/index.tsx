import React, { FC } from 'react';
import { useRouter } from 'next/router';
import SafeSpaceLogoBanner from '../../../components/SafeSpaceLogoBanner';
import { FaAngleRight } from "react-icons/fa";

const UserDetails = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-start pt-20 min-h-screen py-2 bg-gradient-to-r from-background-start-rgb to-background-end-rgb">
      <SafeSpaceLogoBanner />
      <h1 className="text-4xl text-center my-6 mt-[5rem]">Please enter your details to help you further</h1>
      <form method='post' className='w-full px-[20%] mt-[1rem] flex flex-col justify-center items-center' onSubmit={(e) => { e.preventDefault(); router.push('/assessment'); }}>
        <label className="mt-2 w-[60%] input bg-transparent text-[#fff] flex items-center gap-2 focus:outline-none focus:border-none">
          Name
          <input type="text" className="input input-bordered input-primary w-full text-[#fff] border-[#fff]" placeholder="John Wick" />
        </label>
        <label className="mt-5 w-[60%] input bg-transparent text-[#fff] flex items-center gap-2 focus:">
          Email
          <input type="text" className="input input-bordered input-primary w-full text-[#fff] border-[#fff]" placeholder="john@gmail.com" />
        </label>
        <button className="btn btn-lg btn-outline mt-[5rem] text-[#fff] hover:bg-[#230C59] hover:text-[#fff] hover:border-[#fff]">Start Assessment<FaAngleRight className='ml-auto'/></button>
      </form>
    </div>
  );
};

export default UserDetails;

