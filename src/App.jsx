import React, { useEffect, useState } from 'react'
import ThemeProvider from './context/Context'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Header from './components/Header'
import ErrorPage from './pages/ErrorPage'

const App = () => {

  const Api_Url = "https://restcountries.com/v3.1/all"
  let [countriesData, setCountriesData] = useState([])//main

  useEffect(() => {

    async function fetchData(Api_Url) {

      try {
        const data = await fetch(Api_Url)
        const jsonData = await data.json()
        setCountriesData(jsonData)
      
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchData(Api_Url)
  }, [])

  return (
    <>
      {countriesData.length === 0 ?
        <div className='flex justify-center items-center m-auto mt-[10%]'>

          <img src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
        </div> :

        <ThemeProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage countriesData={countriesData} />} />
              <Route path="/about/:countryId" element={<About />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      }
    </>
  )
}

export default App