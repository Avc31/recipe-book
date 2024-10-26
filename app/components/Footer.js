import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-yellow-600 text-white py-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <p className="text-sm">&copy; 2024 RecipeBook. All rights reserved.</p>
        <nav className="mt-3 flex space-x-4">
          <Link href="/" className="text-black-400 hover:text-white transition duration-300">
            Home
          </Link>
          <Link href="/about" className="text-black-400 hover:text-white transition duration-300">
            About
          </Link>
          <Link href="/contact" className="text-black-400 hover:text-white transition duration-300">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
