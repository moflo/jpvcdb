import * as React from 'react'
import App from '../components/App'
import Login from '../landing/Login'
import Head from 'next/head'

export default () => (
  <App>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
    </Head>
    <Login />
  </App>
)
