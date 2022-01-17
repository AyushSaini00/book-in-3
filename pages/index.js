import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useState } from 'react';
import Link from 'next/link';
import FooterHomepage from '../components/FooterHomepage';

export default function Home({ data }) {
  const [searchValue, setSearchValue] = useState('');

  const filteredData = data
    .sort(
      (a, b) =>
        Number(new Date(b.frontMatter.updatedAt)) -
        Number(new Date(a.frontMatter.updatedAt))
    )
    // code to filter data by username
    // .filter((dataObj) =>
    //   dataObj.frontMatter.name.toLowerCase().includes(searchValue.toLowerCase())
    // )
    .map((dataObj) => {
      return {
        ...dataObj,
        frontMatter: {
          ...dataObj.frontMatter,
          tags: dataObj.frontMatter.tags.filter((tag) =>
            tag.toLowerCase().includes(searchValue.toLowerCase())
          )
        }
      };
    })
    .filter((dataObj) => dataObj.frontMatter.tags.length > 0);

  return (
    <Layout title="Book in 3 | Home">
      <header className={styles.header}>
        <h1>
          Book in <span className="green">3</span>
        </h1>
        <p>Find or share book summaries in three sentences (or less)</p>
      </header>

      <form autoComplete="off" className={styles.form}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for a book category"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
      <section className={styles[`data-section`]}>
        {!filteredData.length && (
          <p className={styles[`no-result-found`]}>0 results found</p>
        )}

        {filteredData.map((item) => (
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
      <FooterHomepage />
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
