import * as React from 'react'
import App from '../components/App'
import Ranking from '../landing/Ranking'
import Head from 'next/head'


const ranking = ({ id }) => (
  <App>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
    </Head>
    <Ranking id={id || '2018'}/>
  </App>
)

ranking.getInitialProps = ({ query: { id } }) => {
  // console.log("Ranking: ", id)
  return { id }
}

export default ranking
