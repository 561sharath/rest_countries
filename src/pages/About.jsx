import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { ThemeChange } from '../context/Context';

const About = () => {
    const { countryId } = useParams()

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
    let newCountriesData = JSON.parse(JSON.stringify(countriesData))
    let aboutCountryData = newCountriesData.filter((country) => country.cca3 === countryId)
    let { darkTheme } = useContext(ThemeChange)

    return (
        <>
            {countriesData.length === 0 ?
                <div className='flex justify-center items-center m-auto mt-[10%]'>

                    <img src="https://i.gifer.com/ZZ5H.gif" alt="loader" />
                </div> :
                <div className={` ${darkTheme ? 'bg-white text-black' : 'bg-[#202D36] text-white'} h-[100vh]`}>
                    <div className='pt-10'>
                        <Link to="/">
                            <button className={`border-2 border-gray px-10 py-2  mx-20 flex gap-2 justify-center items-baseline ${darkTheme ? '  text-black' : 'text-white bg-[#202D36]'}`}><FaArrowLeft />Back</button>
                        </Link>

                        <div className={` mx-20`}>
                            <div className='grid grid-flow-col mt-10'>
                                <div className='col-span-1'>
                                    <img src={aboutCountryData[0]?.flags?.png} className='rounded-lg w-[80%] h-[100%]' />
                                    
                                </div>
                                <div >
                                    <div>
                                        <h1 className='font-bold text-3xl mt-24'>{aboutCountryData[0]?.name?.common}</h1>
                                    </div>
                                    <div className='grid grid-flow-col  col-span-1 mt-4 leading-8'>
                                        <div>

                                            <p><strong>Native Name</strong> : {aboutCountryData[0]?.name?.common}</p>
                                            <p><strong>Population</strong> : {aboutCountryData[0]?.population}</p>

                                            <p><strong>Region</strong> : {aboutCountryData[0]?.region}</p>
                                            <p><strong>Subregion</strong> : {aboutCountryData[0]?.subregion}</p>
                                            <p><strong>Capital</strong> : {aboutCountryData[0]?.capital}</p>
                                        </div>
                                        <div>
                                            <p><strong>Top Level Domain</strong> : {aboutCountryData[0]?.tld}</p>
                                            <p><strong>Currencies</strong> : {aboutCountryData[0] ? Object.keys(aboutCountryData[0].currencies) : []} </p>
                                            
                                            <p><strong>Languages</strong> : {aboutCountryData[0] ? Object.keys(aboutCountryData[0].languages) : []}</p>

                                        </div>
                                    </div>
                                    <div className='flex mt-10 flex-wrap'>
                                        <p><strong>Borders</strong> : </p>
                                        {aboutCountryData[0]?.borders ? aboutCountryData[0]?.borders.map((country, index) =>
                                            
                                            <Link key={index} to={`/about/${country}`}>
                                                <button className='border-2  ml-2 px-3'>{country}</button>
                                            </Link>
                                        ) : []}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default About