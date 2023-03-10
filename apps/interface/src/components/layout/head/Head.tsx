import NextHead from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { MetaProps } from '../../../models';
import { MetaData } from '../../../models/head.model';

const Head = ({ customMeta }: { customMeta?: MetaProps }): JSX.Element => {
  const router = useRouter();
  const meta = new MetaData(customMeta ?? {})
  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_CLIENT_URL}${router.asPath}`} />
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_CLIENT_URL}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="OnlyFans Insider - Website" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <Script
        id={meta.title}
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(meta.structuredData) }}
      />
    </NextHead>
  );
};

export default Head;