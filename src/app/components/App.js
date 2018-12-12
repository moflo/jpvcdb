import React from 'react'
import Header from './Header'
import NextSeo from 'next-seo';

import '../asserts/styles.less'
import SEO from '../next-seo.config';

const App = ({ children }) => (
  <main>
    <NextSeo config={SEO} />
    {children}
  </main>
)

export default App


