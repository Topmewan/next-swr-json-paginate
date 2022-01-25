import Head from "next/head";
import Page from "../components/Page";
import useQuery from "../helpers/useQuery";

export default function Home() {

  const {page, limit, search} = useQuery();

  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
              integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
              crossOrigin="anonymous" referrerPolicy="no-referrer"/>
      </Head>
      <main>
        {/*<div style={{display:'none'}}>*/}
        {/*  <Page page={page -1} limit={limit} search={search}/>*/}
        {/*</div>*/}

        <Page page={page} limit={limit} search={search}/>

        {/*<div style={{display:'none'}}>*/}
        {/*  <Page page={page +1} limit={limit} search={search}/>*/}

        {/*</div>*/}

      </main>


    </div>
  )
}
