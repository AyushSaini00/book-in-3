import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';

const UserDataPage = ({ frontMatter, slug, mdxSource }) => {
  const { name, bio, twitter, url, updatedAt } = frontMatter;
  const sizes = {
    userImage: 100,
    icon: 25
  };
  return (
    <Layout>
      <header className="page-header">
        {name && <h1>{name}</h1>}
        {bio && <p className="bio">{bio}</p>}
        {updatedAt && (
          <p className="updated">
            Updated @ {format(parseISO(updatedAt), 'MMM dd, yyyy')}
          </p>
        )}
        {(twitter || url) && (
          <div className="logo-wrapper">
            {twitter && (
              <a
                href={`https://www.twitter.com/${twitter}`}
                className="logo-link"
              >
                <svg className="svg" viewBox="0 0 512 512">
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                </svg>
              </a>
            )}
            {url && (
              <a href={url} className="logo-link">
                <svg className="svg" viewBox="0 0 24 24">
                  <path d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41c2.93 1.18 5 4.05 5 7.41 0 2.08-.8 3.97-2.1 5.39M11 19.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
                </svg>
              </a>
            )}
          </div>
        )}
        <div className="hr-line"></div>
      </header>
      <article>
        <MDXRemote {...mdxSource} />
      </article>
      <footer>
        <p>
          Powered by{' '}
          <Link href="/">
            <a>Book in 3</a>
          </Link>{' '}
          - Find or share summaries of your favorite books in 3 sentences or
          less
        </p>
      </footer>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('data'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(
    path.join('data', slug + '.mdx'),
    'utf-8'
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource
    }
  };
};

export default UserDataPage;
