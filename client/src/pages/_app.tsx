import "../styles/globals.css";
import Head from "next/head";
import { GlobalContext } from '../utils/globalContext';
import { AuthProvider } from '../context/AuthContext'; // Import the AuthProvider
import type { AppProps } from 'next/app'; // Next.js type for AppProps

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Safe Space</title>
        <meta name="description" content="A Mental Health Wellness Chatbot" />
      </Head>
      <GlobalContext.Provider value={{ requestConfig: { url: "https://api-safe-space.vercel.app/" } }}>
        <AuthProvider> {/* Wrap the component tree with AuthProvider */}
          <Component {...pageProps} />
        </AuthProvider>
      </GlobalContext.Provider>
    </>
  );
}
