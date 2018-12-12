import * as React from 'react'
import App from '../components/App'
import Home from '../landing/Home'
import Head from 'next/head'

export default () => (
  <App>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
    </Head>
    <Home />
  </App>
)
