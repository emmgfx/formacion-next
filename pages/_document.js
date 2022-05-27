import Document, { Html, Head, Main, NextScript } from "next/document";
import { hexToHSL } from "../shared/utils";

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    let pageProps = null;

    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          pageProps = props.pageProps;
          return <App {...props} />;
        },
        enhanceComponent: (Component) => Component,
      });

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, pageProps };
  }

  render() {
    const whiteLabel = this.props.__NEXT_DATA__.props.whiteLabel;
    const { h, s, l } = hexToHSL(whiteLabel.config.colors.primary);
    return (
      <Html
        style={{
          "--color-primary": `hsl(${h}, ${s}%, ${l}%)`,
          "--color-primary-light": `hsl(${h}, ${s}%, ${l + 10}%)`,
          "--color-primary-dark": `hsl(${h}, ${s}%, ${l - 10}%)`,
          "--color-primary-darkest": `hsl(${h}, ${s}%, ${l - 30}%)`,
        }}
      >
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
