import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static getInitialProps( {  renderPage } ) {
    const page = renderPage();

    return {
        ...page,
      };
  }

  render() {
    return (
      <Html lang="en">
        <Head >
          {/* Site Logo */}
          <link rel="icon" href="/favicon.ico" />
          {/* Imported Fonts -- MIGHT NOT NEED PRELOAD WITH NEXT.JS 10.2 */}
          <link rel="preload" href="/static/fonts/{PUT_YOUR_FONT_HERE}" as="font" crossOrigin="" /> 
        </Head>
        <body className='loading'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;