import Document, { Head, Html, Main, NextScript } from 'next/document';
import { DocumentContext } from "next/dist/shared/lib/utils";
import generateCSP, { generateNonce } from '../utils/csp/generateCSP';
import Script from 'next/script'

interface DocumentProps {
  nonce: string;
}
class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const nonce: string = generateNonce();
    ctx.res?.setHeader("Content-Security-Policy", generateCSP({ nonce }));
    const initialProps = await Document.getInitialProps(ctx);
    const additionalProps = { nonce };
    return {
      ...initialProps,
      ...additionalProps,
    };
  }
  render(): JSX.Element {
    const { nonce } = this.props;
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Carter+One&display=swap" rel="stylesheet" />
          <Script
            id={nonce}
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `window.__webpack_nonce__ = "${nonce}"`,
            }}
          />
        </Head>
        <body className="bg-white dark:bg-primary-dark text-secondary-2 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
