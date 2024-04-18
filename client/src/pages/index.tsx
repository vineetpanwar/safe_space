import React, { FC } from 'react';
import { useRouter } from 'next/router';
import SafeSpaceLogoBanner from '../../components/SafeSpaceLogoBanner';
import { FaAngleRight } from "react-icons/fa";

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-start pt-20 min-h-screen py-2 bg-gradient-to-r from-background-start-rgb to-background-end-rgb">
      <SafeSpaceLogoBanner />
      <h1 className="text-4xl text-foreground-rgb text-center my-6 mt-[5rem]">Welcome to SafeSpace - Your Mental Health Wellness Companion</h1>
      <p className="text-xl text-center mt-[1rem] px-[10rem]">{`At SafeSpace, we understand the importance of mental health, and we're here to offer you a safe and welcoming environment to explore your well-being. Our chatbot is designed to provide you with personalized mental health assessments and valuable resources, all from the comfort of your own home.`}</p>
      <button className="btn btn-lg btn-outline mt-[5rem] w-[25%] text-[#fff] hover:bg-[#230C59] hover:text-[#fff] hover:border-[#fff]" onClick={() => { router.push('/userDetails'); }}>Get Started <FaAngleRight className='ml-auto'/></button>
    </div>
  );
};

export default HomePage;

