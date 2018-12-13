import React from 'react'
import Header from './Header'
import NextSeo from 'next-seo';
import Router from "next/router";

import '../asserts/styles.less'
import SEO from '../next-seo.config';

Router.events.on('routeChangeComplete', () => { window.scrollTo(0, 0); });

const App = ({ children }) => (
  <main>
    <NextSeo config={SEO} />
    {children}
  </main>
)

export default App


