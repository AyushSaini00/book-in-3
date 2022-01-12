import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useState } from 'react';

export default function Home({ data }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <Layout>
      <h1>Book in 3</h1>
      <p>
        Find or share summaries of your favorite books in 3 sentences (or less)
      </p>
      <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
        <input
          type="text"
          required={true}
          name="inputValue"
          id="inputValue"
          placeholder="username or book category"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Find</button>
      </form>
      {/* <div>
        <h2>What&apos;s new?</h2>
        <p>Display last 3 recent updates</p>
      </div> */}
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
