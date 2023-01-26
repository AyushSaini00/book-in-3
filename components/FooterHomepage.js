import Link from 'next/link';

const FooterHomepage = () => {
  return (
    <footer>
      <p>
        Add your{' '}
        <a
          href="https://github.com/AyushSaini00/book-in-3#how-can-i-add-my-page-"
          target="_blank"
          rel="noopener noreferrer"
        >
          page
        </a>{' '}
        | Built by <a href="https://twitter.com/AyushCodes">Ayush</a>
        {/* <Link href="/why">
          <a>Why?</a>
        </Link> */}
      </p>
    </footer>
  );
};

export default FooterHomepage;
