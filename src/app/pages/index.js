import * as React from 'react'
import App from '../components/App'
import Home from '../layout/Home'
import Head from 'next/head'

export default () => (
  <App>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
    </Head>
    <Home />
  </App>
)
