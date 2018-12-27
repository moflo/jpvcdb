import * as React from 'react'
import App from '../components/App'
import About from '../layout/About'
import Head from 'next/head'

export default () => (
  <App>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
    </Head>
    <About />
  </App>
)
