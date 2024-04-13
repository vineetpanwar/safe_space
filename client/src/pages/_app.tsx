// pages/_app.tsx
import '../app/globals.css'; // Adjust the path as needed
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
