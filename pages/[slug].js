import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../components/Layout';
import HeaderUserPage from '../components/HeaderUserPage';

const UserDataPage = ({ frontMatter, mdxSource }) => {
  const { name, twitter } = frontMatter;

  return (
    <Layout
      title={`${name}'s Book in 3`}
      author={name}
      twitter={twitter}
      isHomePage={false}
    >
      <HeaderUserPage frontMatter={frontMatter} />
      <main>
        <article>
          <MDXRemote {...mdxSource} />
        </article>
      </main>
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
