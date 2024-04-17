import SafeSpaceLogoBanner from '../../../../components/SafeSpaceLogoBanner';
import Link from 'next/link';
import React from 'react';

export default function Resources() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-background-start-rgb to-background-end-rgb">
      <SafeSpaceLogoBanner />
      <h2 className="text-3xl text-foreground-rgb my-6">Mental Health Resources</h2>
      <p className="text-foreground-rgb text-center mb-6">Explore resources or chat with us for support.</p>
      <div className="space-y-4">
        <Link href="/chat">
          <a className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Chat with Us
          </a>
        </Link>
        <Link href="/articles/mental-health">
          <a className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Read Articles
          </a>
        </Link>
        <Link href="/videos">
          <a className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Watch Videos
          </a>
        </Link>
      </div>
    </div>
  );
}