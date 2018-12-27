import * as React from 'react'
import App from '../components/App'
import Company from '../layout/Company'
import Head from 'next/head'

const company = ({ id }) => (
  <App>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
    </Head>
    <Company id={id || 'pechakucha'}/>
  </App>
)

company.getInitialProps = ({ query: { id } }) => {
  // console.log("Company: ", id)
  return { id }
}

export default company
