import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Home({ data }) {
  return (
    <Layout>
      <h1>Book in 3</h1>
      <p>
        Find or share summaries of your favorite books in 3 sentences (or less)
      </p>
      {data.map((elem) => (
        <div key={elem.frontMatter.name}>{elem.frontMatter.name}</div>
      ))}
    </Layout>
  );
}
export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('data'));

  const data = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('data', filename),
      'utf-8'
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: filename.split('.')[0]
    };
  });
  return {
    props: {
      data
    }
  };
};
