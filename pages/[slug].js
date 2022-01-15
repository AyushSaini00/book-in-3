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
                <Image
                  src={`/twitter.svg`}
                  alt="twitter logo"
                  width={sizes.icon}
                  height={sizes.icon}
                />
              </a>
            )}
            {url && (
              <a href={url} className="logo-link">
                <Image
                  src={`/website.svg`}
                  alt="website logo"
                  width={23}
                  height={23}
                />
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
