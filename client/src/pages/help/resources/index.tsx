import React, { useState, useEffect } from "react";
import SafeSpaceLogoBanner from "../../../../components/SafeSpaceLogoBanner";
import CarouselElement from '../../../../components/CarouselElement';

interface Article {
  title: string;
  summary: string;
  imageUrl: string;
  href: string;
}

const articles: Article[] = [
  {
    title: "Understanding Anxiety",
    summary: "Explore the causes of anxiety and the various ways to manage it.",
    imageUrl: "/newspaper-anxiety-headlines.jpg", // Adjust the path as necessary
    href: "https://www.cdc.gov/mentalhealth/learn/index.htm",
  },
  {
    title: "Coping with Depression",
    summary: "Find strategies for dealing with depression and its symptoms.",
    imageUrl: "/depression.jpeg", // Adjust the path as necessary
    href: "https://www.cdc.gov/mentalhealth/learn/index.htm",
  },
  {
    title: "Coping with Personality Disorder",
    summary: "Managing and adapting to persistent patterns of thoughts, feelings, and behaviors that deviate from cultural norms and cause distress or dysfunction in daily life.",
    imageUrl: "/personalityDisorder.jpg", // Adjust the path as necessary
    href: "https://www.cdc.gov/mentalhealth/learn/index.htm",
  },
  {
    title: "Coping with Psychotic Disorder",
    summary: "Learning strategies to manage hallucinations, delusions, and disorganized thinking to improve functioning and reduce distress.",
    imageUrl: "/psychoticDisorder.jpeg", // Adjust the path as necessary
    href: "https://www.cdc.gov/mentalhealth/learn/index.htm",
  },
  {
    title: "Coping with Mood Disorder",
    summary: "Developing skills to regulate mood swings, manage symptoms of depression or mania, and improve overall emotional well-being.",
    imageUrl: "/moodDisorder.jpeg", // Adjust the path as necessary
    href: "https://www.cdc.gov/mentalhealth/learn/index.htm",
  },
  {
    title: "Coping with Anxiety",
    summary: "Implementing techniques to reduce excessive worry, panic attacks, and avoidance behaviors, and to enhance relaxation and coping mechanisms.",
    imageUrl: "/anxiety.webp", // Adjust the path as necessary
    href: "https://www.cdc.gov/mentalhealth/learn/index.htm",
  },
  {
    title: "Understandin Depression",
    summary: "Gaining insight into the causes, symptoms, and treatments of depression, and learning strategies to cope with low mood, lack of energy, and negative thoughts.",
    imageUrl: "/depression-hub.jpg", // Adjust the path as necessary
    href: "https://www.cdc.gov/mentalhealth/learn/index.htm",
  },
  // Add more articles here
];

const MentalHealthResources = () => {

  return (
    <div className="relative flex flex-col items-center justify-center w-full pt-20">
      <SafeSpaceLogoBanner />
      <h1 className="text-3xl font-bold text-center my-4">
        Mental Health Articles
      </h1>
      <h3>
        Scroll right for some great mental health resources put forwared by our team just for you!!
      </h3>
      <div
        className="relative w-full flex justify-center items-center mt-8"
        style={{ height: "50vh" }}
      >
        {
          <div
            className="h-auto carousel carousel-center max-w-4xl p-4 space-x-4 bg-neutral rounded-box w-[50%] cursor-pointer"
            style={{ height: "inherit" }}
          >
            {articles.map((curr, index) => {
              return <CarouselElement key={index} article={curr} index={index} />;
            })}
          </div>
        }
      </div>
    </div>
  );
};

export default MentalHealthResources;
