import Link from 'next/link';

const FooterUserPage = () => {
  return (
    <footer>
      <p>
        Powered by{' '}
        <Link href="/">
          <a>Book in 3</a>
        </Link>{' '}
        - Find or share book summaries in three sentences (or less)
      </p>
    </footer>
  );
};

export default FooterUserPage;
