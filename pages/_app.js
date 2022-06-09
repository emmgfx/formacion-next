import { AuthProvider } from "../contexts/auth";
import { WhiteLabelProvider } from "../contexts/whiteLabel";

import Preloader from "../components/Preloader";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <WhiteLabelProvider>
        <Preloader />
        <Component {...pageProps} />
      </WhiteLabelProvider>
    </AuthProvider>
  );
}

export default MyApp;
