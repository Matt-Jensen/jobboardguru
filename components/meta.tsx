import Head from 'next/head'
import { FunctionComponent } from 'react';
// import { HOME_OG_IMAGE_URL } from '../lib/constants'

const Meta: FunctionComponent = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#FFF" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`Launch your company in the United States with Finance Pond.`}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      {/*<meta property="og:image" content={HOME_OG_IMAGE_URL} />*/}

      {/* Google Font Setup */}
      {/* eslint-disable */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;1,700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      {/* eslint-enable */}
    </Head>
  )
}

export default Meta
