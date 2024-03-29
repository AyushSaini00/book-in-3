import Head from 'next/head';
import FooterHomepage from './FooterHomepage';
import FooterUserPage from './FooterUserPage';

const Layout = ({
  title,
  description,
  author,
  type,
  twitter,
  image,
  isHomePage,
  children
}) => {
  const defaultMeta = {
    title: 'Book in 3',
    description:
      'Find or share summaries of your favorite books in 3 sentences or less',
    author: 'Ayush Saini',
    type: 'website',
    twitter: '@AyushCodes',
    image: 'https://bookin3.vercel.app/cover.png'
  };
  return (
    <>
      <Head>
        <link
          rel="preload prefetch"
          href="/fonts/Hind/Hind-Regular.tff"
          as="font"
          crossOrigin
        />
        <link
          rel="preload prefetch"
          href="/fonts/Hind/Hind-Bold.tff"
          as="font"
          crossOrigin
        />

        <title>{title ? title : defaultMeta.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={description ? description : defaultMeta.description}
        />
        <meta name="keywords" content="book summary notes book-in-3" />
        <meta name="author" content={author ? author : defaultMeta.author} />

        <meta property="og:title" content={title ? title : defaultMeta.title} />
        <meta
          property="og:description"
          content={description ? description : defaultMeta.description}
        />
        <meta property="og:image" content={image ? image : defaultMeta.image} />
        <meta property="og:type" content={type ? type : defaultMeta.type} />
        <meta
          property="og:site_name"
          content={title ? title : defaultMeta.title}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:site"
          content={twitter ? twitter : defaultMeta.twitter}
        />
        <meta
          name="twitter:creator"
          content={twitter ? twitter : defaultMeta.twitter}
        />
        <meta
          name="twitter:title"
          content={title ? title : defaultMeta.title}
        />
        <meta
          name="twitter:description"
          content={description ? description : defaultMeta.description}
        />
        <meta
          name="twitter:image"
          content={image ? image : defaultMeta.image}
        />
      </Head>
      {children}
      {isHomePage ? <FooterHomepage /> : <FooterUserPage />}
    </>
  );
};

export default Layout;
