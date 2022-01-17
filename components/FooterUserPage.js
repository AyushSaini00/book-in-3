import Link from 'next/link';

const FooterUserPage = () => {
  return (
    <footer>
      <p className="footer-user-page-p-1">
        Add your{' '}
        <a
          href="https://github.com/AyushSaini00/book-in-3#how-can-i-add-my-page-"
          target="_blank"
          rel="noopener noreferrer"
        >
          page
        </a>
      </p>
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
