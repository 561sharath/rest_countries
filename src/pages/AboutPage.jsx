import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { ThemeChange } from '../context/Context';
import ErrorPage from './ErrorPage';
import { getCountriesData } from '../Api';

const About = () => {
    const { countryId } = useParams()
    const [countriesData, setCountriesData] = useState([])
    const [status, setStatus] = useState({ loading: true, error: null })

    useEffect(() => {

        async function fetchData() {

            try {
                const data = await getCountriesData()
                setCountriesData(data)
                setStatus({ loading: false, error: null })

            } catch (error) {
                setStatus({ loading: false, error: error.message })
            }

        }

        fetchData()
    }, [])

    if (status.loading){
        return (
            <div className='m-20'>
                <div className='text-4xl'>
                    Loading .....
                </div>
            </div>
        )
    }

    if (status.error){
        return (
            <div className='text-4xl m-20'>
                {status.error}
            </div>
        )
    }
    
    let aboutCountryData = countriesData.filter((country) => country.cca3 === countryId)
    const { darkTheme } = useContext(ThemeChange)

    return (
        <>

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
                                        <p><strong>Currencies</strong> : {aboutCountryData[0] ? Object.keys(aboutCountryData[0].currencies).join(",") : []} </p>

                                        <p><strong>Languages</strong> : {aboutCountryData[0] ? Object.keys(aboutCountryData[0].languages).join(",") : []}</p>

                                    </div>
                                </div>
                                <div className='flex mt-10 flex-wrap'>
                                    <p><strong>Borders</strong> : </p>
                                    {aboutCountryData[0]?.borders ? aboutCountryData[0]?.borders.map((country, index) =>

                                        <Link key={index} to={`/about/${country}`}>
                                            <button className='border-2  ml-2 px-3'>{country}</button>
                                        </Link>
                                    ) : (
                                        <p>N/A</p>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default About