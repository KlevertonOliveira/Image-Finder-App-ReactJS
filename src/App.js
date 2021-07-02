import { CssBaseline } from '@material-ui/core'
import React from 'react'
import Gallery from './components/Gallery'
import Header from './components/Header'
import ImageSearch from './components/ImageSearch'

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <ImageSearch />
      <Gallery />
    </>
  )
}

export default App
