import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

  return (
    <Html lang="ja">
      <Head>
        <meta property="og:url" content="https://www.share-touring-spot.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Share Touring Spot" />
        <meta property="og:description" content="ツーリングスポット共有サイトです。" />
        <meta property="og:site_name" content="ツーリングスポット共有サイトです。" />
        <meta property="og:image" content="https://www.share-touring-spot.com/main_icon.png" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="640" />
        <link rel="icon" href={process.env.FAVICON_URL} />
        <link rel="apple-touch-icon" href={process.env.FAVICON_URL} />
        <meta name="description" content="ツーリングスポット共有サイトです。" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://www.share-touring-spot.com/" />
        {/* Global site tag (gtag.js) - Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
