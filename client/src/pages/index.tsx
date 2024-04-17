import React, { FC } from 'react';
import SafeSpaceLogoBanner from '../../components/SafeSpaceLogoBanner';

const HomePage = () => {
return (
    <>
        <div className='pt-20'>
            <SafeSpaceLogoBanner />
        </div>
        <h1 className='text-4xl text-center mt-6'>This is the home page</h1>
    </>
)}

export default HomePage;

