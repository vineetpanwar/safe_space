// pages/articles/mental-health/index.tsx
import React from 'react';
import SafeSpaceLogoBanner from '../../../../components/SafeSpaceLogoBanner';

const MentalHealthArticles = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SafeSpaceLogoBanner />
      <h1 className="text-3xl font-bold mt-5">Mental Health Articles</h1>
      {/* Article listings or contents go here */}
    </div>
  );
};

export default MentalHealthArticles;
