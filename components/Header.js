import Link from "next/link";

const Header = ({ credits }) => {
  const logout = () => {};
  return (
    <header className="flex justify-between py-8 px-4 bg-primary-700 text-white font-bold">
      <h1>
        <Link href="/">VCE</Link>
      </h1>
      <nav>
        {credits && (
          <p>
            Tienes {credits} créditos. <button>Logout</button>
          </p>
        )}
        {!credits && (
          <ul>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
