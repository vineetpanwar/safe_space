import React, {  useEffect, useRef } from "react";

interface Article {
    title: string;
    summary: string;
    imageUrl: string;
    href: string;
}

interface CarouselElementProps {
    index: number;
    article: Article;
  }
  const CarouselElement: React.FC<CarouselElementProps> = ({ index, article }) => {
    const elementRef = useRef(null);
  
    const handleRedirectExternal = (href: string) => {
      window.location.href = href;
    };
  
    const handleMouseEnter = () => {
      if (elementRef.current) {
        // @ts-ignore
        elementRef.current.style.opacity = 1;
      }
    };
  
    const handleMouseLeave = () => {
      if (elementRef.current) {
        // @ts-ignore
        elementRef.current.style.opacity = 0;
      }
    };

    return (
      <div
        key={index}
        className="carousel-item max-w-[50%] overflow-hidden relative"
        onClick={() => handleRedirectExternal(article.href)}
      >
        <div
          
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full transition duration-300 transform hover:scale-110 hover:opacity-20 relative"
        >
          <img className="h-[100%]" src={article.imageUrl} alt={article.title} />
        </div>
        <div
          ref={elementRef}
          style={{ zIndex: 10 }}
          className="text-[#fff] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none transition-opacity duration-300 hover:opacity-1"
        >
          <h3 className="text-lg font-extrabold mb-4">{article.title}</h3>
          <p>
            {article.summary}
          </p>
        </div>
      </div>
    );
  };
  export default CarouselElement;