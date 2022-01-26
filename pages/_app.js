import '../styles/globals.css'
import Layout from "../components/Layout";
import {SWRConfig} from "swr";
import axios from "axios";
import {DataProvider} from "../store/globalContext";

function MyApp({Component, pageProps}) {
  return (
    <DataProvider>
      <SWRConfig value={{
        fetcher: (url) => axios(url).then(res => res.data),
        dedupingInterval:10000
      }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </DataProvider>
  );
}

export default MyApp
