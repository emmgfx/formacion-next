import Link from "next/link";

import { useAuth } from "../contexts/auth";

const Header = () => {
  const { logout, isAuthenticated, credits } = useAuth();

  return (
    <header className="flex justify-between py-8 px-4 bg-primary-700 text-white font-bold">
      <h1>
        <Link href="/">VCE</Link>
      </h1>
      <nav>
        {isAuthenticated && (
          <p>
            Tienes {credits} créditos. <button onClick={logout}>Logout</button>
          </p>
        )}
        {!isAuthenticated && (
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
