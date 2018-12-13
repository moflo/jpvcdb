import * as React from 'react'
import App from '../components/App'
import Cohort from '../landing/Cohort'
import Head from 'next/head'


const cohort = ({ id }) => (
  <App>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
    </Head>
    <Cohort id={id || '2018'}/>
  </App>
)

cohort.getInitialProps = ({ query: { id } }) => {
  // console.log("Cohort: ", id)
  return { id }
}

export default cohort
