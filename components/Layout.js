import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/Hind/Hind-Regular.tff"
          as="font"
          crossOrigin=""
        />
        <title>Book in 3</title>
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
