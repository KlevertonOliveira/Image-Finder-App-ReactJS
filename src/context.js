import React, { useContext, useEffect, useState } from 'react'
require('dotenv').config()

const AppContext = React.createContext()

const apiKey = process.env.REACT_APP_API_KEY;

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [amount, setAmount] = useState(15)
  const [imagesData, setImagesData] = useState([])

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&per_page=${amount}`
      )
      const data = await response.json()
      const newImages = data.hits.map((img) => {
        const { id, largeImageURL, tags, user } = img
        return { id, image: largeImageURL, tags, user }
      })
      setImagesData(newImages)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    searchTerm ? fetchImages() : setImagesData([])
  }, [searchTerm, amount])

  return (
    <AppContext.Provider
      value={{ setSearchTerm, amount, setAmount, imagesData }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
