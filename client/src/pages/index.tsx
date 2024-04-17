import React, { FC } from 'react';
import Link from 'next/link';
import SafeSpaceLogoBanner from '../../components/SafeSpaceLogoBanner';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-background-start-rgb to-background-end-rgb">
      <SafeSpaceLogoBanner />
      <h1 className="text-4xl text-foreground-rgb text-center my-6">Welcome to SafeSpace</h1>
      <p className="text-foreground-rgb text-center mb-6">Your Mental Health Wellness Companion</p>
      <div className="space-y-4">
        <Link href="/help/doctorsNearby">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Find Nearby Doctors
          </a>
        </Link>
        <Link href="/help/resources">
          <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Explore Resources
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

