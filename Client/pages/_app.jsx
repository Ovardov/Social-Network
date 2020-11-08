import Layout from '../components/Layout'
import Head from 'next/head'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
