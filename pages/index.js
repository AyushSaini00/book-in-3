import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useState } from 'react';
import Link from 'next/link';

export default function Home({ data }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <Layout>
      <header className={styles.header}>
        <h1>
          Book in <span className="green">3</span>
        </h1>
        <p>
          Find or share summaries of your favorite books in 3 sentences (or
          less)
        </p>
      </header>

      <form autoComplete="off" className={styles.form}>
        <input
          type="text"
          name="inputValue"
          id="inputValue"
          placeholder="username or book category"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <section className={styles[`data-section`]}>
        {data.map((item) => (
          <div className={styles.item} key={item.slug}>
            <Link href={`/${item.slug}`}>
              <a className={styles.link}>{item.frontMatter.name}</a>
            </Link>
            <ul className={styles[`tags-ul`]}>
              {item.frontMatter.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
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
