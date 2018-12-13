import * as React from 'react'
import App from '../components/App'
import Cohort from '../landing/Cohort'
import Head from 'next/head'

export default () => (
  <App>
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
    </Head>
    <Cohort />
  </App>
)
