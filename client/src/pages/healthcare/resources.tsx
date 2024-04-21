import React, { FC } from 'react';
import { useRouter } from 'next/router';
import SafeSpaceLogoBanner from '../../../components/SafeSpaceLogoBanner';
import { FaAngleRight } from "react-icons/fa";

const HealthcareResources = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-start pt-20 min-h-screen py-2 bg-gradient-to-r from-background-start-rgb to-background-end-rgb">
      <SafeSpaceLogoBanner />
      <h1 className="text-4xl text-center my-6 mt-[5rem]">Please enter your details to help you further</h1>
      <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
        <div className="collapse-title text-xl font-medium">
            Focus me to see content
        </div>
        <div className="collapse-content"> 
            <p>tabIndex={0} attribute is necessary to make the div focusable</p>
        </div>
        </div>
      </div>
  );
};

export default HealthcareResources;
