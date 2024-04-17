import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head> 
            <link rel="icon" href="../resources/favicon.ico" />
            <meta name="description" content="A Mental Health Wellness Chatbot" />
        </Head>
        <body className='flex flex-col font-inter bg-gray-100 min-h-screen'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
