import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Head from "next/head";
import { GlobalContext } from '../utils/globalContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safe Space",
  description: "A Mental Health Wellness Chatbot"
};

interface MyAppProps {
    Component: React.ComponentType;
    pageProps: any
}

export default function myApp({ Component, pageProps }: MyAppProps) {
  return (
    <>
        <GlobalContext.Provider value={{ requestConfig:{url: "https://api-safe-space.vercel.app/"}}}>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <title>Safe Space</title>
            <meta name="description" content="A Mental Health Wellness Chatbot" />
        </Head>
        <Component {...pageProps} className={inter.className} />
        </GlobalContext.Provider>

    </>
  );
}
