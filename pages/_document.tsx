import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head title="Ivo's Website">
          <script
            async
            defer
            data-domain="ivoberger.com"
            src="https://plausible.io/js/plausible.js"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;700&family=Source+Serif+Pro:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
