import Layout from '../components/Layout'
import Head from 'next/head'
import { AuthProvider } from '../hooks/useAuth'

const App = ({ Component, pageProps }) => {

  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  )
}

export default App
