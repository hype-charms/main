import NextHead from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { MetaProps } from '../../../models';
import { MetaData } from '../../../models/head.model';

const Head = ({ customMeta }: { customMeta?: MetaProps }): JSX.Element => {
  const router = useRouter();
  const [meta, setMeta] = useState<MetaData>(new MetaData({
    title: "Hype Charms",
    description: "Add some personality to your Crocs with our cool charms and accessories! Shop Hype Charms for a variety of unique designs that will take your shoe game to the next level. We also have bracelets and backpacks that are perfect for showing off your style. Get ready to hype up your look today!",
    image: "",
    structuredData: "",
    type: "product",
  }));
  useEffect(() => {
    if (customMeta) {
      setMeta(customMeta)
    }
  }, [customMeta])
  return (
    <NextHead>
      <title>{meta.title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_CLIENT_URL}${router.asPath}`} />
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_CLIENT_URL}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Hype Charms" />
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