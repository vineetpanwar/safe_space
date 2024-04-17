// pages/videos/index.tsx
import React from 'react';
import SafeSpaceLogoBanner from '../../../components/SafeSpaceLogoBanner';

const Videos = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SafeSpaceLogoBanner />
      <h1 className="text-3xl font-bold mt-5">Helpful Videos</h1>
      {/* Video listing or embedding goes here */}
    </div>
  );
};

export default Videos;
