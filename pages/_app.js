import Cookies from "cookies";
import App from "next/app";

import { AuthProvider } from "../contexts/auth";
import { getWhiteLabel } from "../shared/whiteLabel";
import { setWhiteLabel } from "../store/slices/whitelabel";

import { wrapper } from "../store/store";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (appContext) => {
    const domain = appContext.ctx.req.headers.host.split(":")[0];
    const appProps = await App.getInitialProps(appContext);
    const whiteLabel = await getWhiteLabel(domain);
    store.dispatch(setWhiteLabel(whiteLabel));
    return { ...appProps, whiteLabel };
  }
);

export default wrapper.withRedux(MyApp);
