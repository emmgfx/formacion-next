import Link from "next/link";

// import { useAuth } from "../contexts/auth";

const Header = () => {
  return (
    <header className="flex justify-between items-center pr-4">
      <Link href="/">
        <img src="https://www.videochaterotico.com/tpl/bootstrap/img/videochaterotico.png" />
      </Link>
      <button className="text-[#083042] p-2 rounded border-[#017cb6] bg-gradient-to-b from-[#9adfff] to-[#42c3ff]">
        <IconMenu size="28" />
      </button>
    </header>
  );

  // linear-gradient(to bottom, 0%, 100%) !important
};

const IconMenu = ({ size = 24 }) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      viewBox={`0 0 24 24`}
    >
      <path
        fill="currentColor"
        d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
      />
    </svg>
  );
};

// const Header = () => {
//   const { isAuthenticated, credits, logout } = useAuth();
//   return (
//     <header className="flex justify-between py-8 px-4 bg-primary-700 text-white font-bold">
//       <h1>
//         <Link href="/">VCE</Link>
//       </h1>
//       <nav>
//         {isAuthenticated && (
//           <p>
//             Tienes {credits} créditos. <button onClick={logout}>Logout</button>
//           </p>
//         )}
//         {!isAuthenticated && (
//           <ul>
//             <li>
//               <Link href="/login">Login</Link>
//             </li>
//           </ul>
//         )}
//       </nav>
//     </header>
//   );
// };

export default Header;
