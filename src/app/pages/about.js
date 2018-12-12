import * as React from 'react'
import App from '../components/App'
import About from '../landing/About'
import Head from 'next/head'

export default () => (
  <App>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
    </Head>
    <About />
  </App>
)
