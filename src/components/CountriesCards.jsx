import React, { useContext } from 'react'
import { ThemeChange } from '../context/Context'
import { Link } from 'react-router-dom'


const CountriesCards = ({ countriesData }) => {

    const { darkTheme } = useContext(ThemeChange)

    return (

        <div className={`mb-10 mr-5 shadow-2xl  rounded-lg overflow-hidden ${darkTheme ? 'bg-white text-black' : 'bg-[#2B3743] text-white'}`}>
            <Link to={`about/${countriesData.cca3}`}>
                <img src={countriesData.flags.png} className='w-[100%] h-[60%] rounded-lg' />

                <h1 className='my-2 font-medium mx-3 text-[1.2rem]'>{countriesData.name.common}</h1>
                <p className='mx-3'>Population : {countriesData.population}</p>
                <p className='mx-3'>Region : {countriesData.region}</p>
                <p className='mb-2 mx-3'>Capital : {countriesData.capital ? countriesData.capital : "NA"}</p>
            </Link>

        </div>

    )
}

export default CountriesCards