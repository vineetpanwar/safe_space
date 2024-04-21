import React, { useState, useEffect } from 'react';
import SafeSpaceLogoBanner from '../../../../components/SafeSpaceLogoBanner';

interface Article {
  title: string;
  summary: string;
  imageUrl: string;
}

interface CarouselSlideProps {
  article: Article;
  isActive: boolean;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ article, isActive }) => {
    const activeClass = isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full';
    
    // Reduced image height percentage
    const imageHeightPercentage = 50; // This will control the image height
    const contentHeightPercentage = 100 - imageHeightPercentage; // Adjust content height accordingly
  
    return (
      <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out transform ${activeClass}`}>
        <div className="rounded-lg overflow-hidden shadow-xl max-w-4xl mx-auto flex flex-col bg-white" style={{ height: '40vh' }}> {/* Reduced total height */}
          <div className="relative w-full" style={{ height: `${imageHeightPercentage}%` }}>
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end"> {/* Dark overlay */}
              <div className="px-6 pb-4 text-left">
                <h2 className="text-3xl font-bold text-white mb-3">{article.title}</h2>
                <p className="text-lg text-gray-200">{article.summary}</p>
              </div>
            </div>
          </div>
          <div className="bg-pink p-6 text-center flex flex-col justify-between" style={{ height: `30%` }}>
            <div>
              {/* Additional content here */}
            </div>
            <a href="https://www.cdc.gov/mentalhealth/learn/index.htm" className="self-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  
  
  

const articles: Article[] = [
  {
    title: 'Understanding Anxiety',
    summary: 'Explore the causes of anxiety and the various ways to manage it.',
    imageUrl: '/newspaper-anxiety-headlines.jpg', // Adjust the path as necessary
  },
  {
    title: 'Coping with Depression',
    summary: 'Find strategies for dealing with depression and its symptoms.',
    imageUrl: '/depression.jpeg', // Adjust the path as necessary
  },
  // Add more articles here
];

const MentalHealthResources = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % articles.length);
    }, 3000); // Change slides every 3 seconds
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen pt-8">
      <SafeSpaceLogoBanner />
      <h1 className="text-3xl font-bold text-center my-4">Mental Health Articles</h1>
      <div className="relative w-full flex justify-center items-center" style={{ height: '50vh' }}>
        {articles.map((article, index) => (
          <CarouselSlide key={index} article={article} isActive={index === activeIndex} />
        ))}
      </div>
    </div>
  );
};

export default MentalHealthResources;
