import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
  <MoralisProvider
    appId="o0AsHbfuwjj5JMNgwWfuGKRrXIX3DiXhEF2VfQY1"
    serverUrl="https://d0i5o4cvvtsk.usemoralis.com:2053/server"
    >
    {<Component {...pageProps} />}
  </MoralisProvider>
  );
}

export default MyApp;
