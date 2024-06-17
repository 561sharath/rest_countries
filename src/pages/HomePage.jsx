import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import CountrySections from '../components/CountrySections'
import CountriesCards from '../components/CountriesCards'
import { ThemeChange } from '../context/Context'
import Sort from '../components/Sort'
import InpuSearch from '../components/InpuSearch'

const HomePage = ({ countriesData }) => {

    let [regionData, setRegionData] = useState("default")
    let [inputData, setInputData] = useState("")
    let [populationData, setPopulationData] = useState("default")
    let [areaData, setAreaData] = useState("default")
    let [subRegionData, setSubRegionData] = useState("default")


    let filterData = JSON.parse(JSON.stringify(countriesData));

    function handleRegionChange(region) {
        setRegionData(region)
        setInputData("")
    }

    function handleInputChange(input) {
        setInputData(input)

    }
    function sortByPopulation(populationValue) {

        setPopulationData(populationValue)
        setAreaData("default")
    }

    function sortByArea(areaValue) {
        setAreaData(areaValue)
        setPopulationData("default")
    }

    function handleSubRegionChange(regionValue) {
        setSubRegionData(regionValue)
    }



    if (regionData == "default") {

        filterData = [...countriesData]
    }
    else {

        let newRegionData = countriesData.filter((country) => country.region == regionData)
        filterData = newRegionData

        if (subRegionData != "default") {

            let newSubRegionData = filterData.filter((country) => country.subregion == subRegionData)
            filterData = newSubRegionData
        }
        else {
            filterData = newRegionData
        }
    }

    if (inputData != "") {
        let newInputData = filterData.filter((country) => {
            if (country.name.common.toLowerCase().includes(inputData.toLowerCase())) {
                return country
            }
        })
        filterData = newInputData
    }

    if (populationData == "Ascending") {
        filterData.sort((country1, country2) => country1.population - country2.population)

    }
    else if (populationData == "Descending") {
        filterData.sort((country1, country2) => country2.population - country1.population)
    }

    if (areaData == "Ascending") {
        filterData.sort((country1, country2) => country1.area - country2.area)
    }
    else if (areaData == "Descending") {
        filterData.sort((country1, country2) => country2.area - country1.area)
    }



    const continenetsData = countriesData.reduce((acc, curr) => {

        if (!acc.includes(curr.region)) {
            acc.push(curr.region)
        }
        return acc

    }, []).sort()

    const subRegionsData = countriesData.reduce((acc, curr) => {

        if (regionData != "default" && curr.region == regionData) {

            if (!acc.includes(curr.subregion)) {
                acc.push(curr.subregion)
            }
        }
        return acc
    }, [])



    let { darkTheme } = useContext(ThemeChange)

    return (
        <div className={`${darkTheme ? 'bg-white-100 text-black' : 'bg-[#202D36] min-h-[100vh] text-white'}`}>
            
            <div className={`${darkTheme ? 'bg-white-100 text-black' : 'bg-[#202D36] text-white'} flex justify-between mx-10`}>

                <InpuSearch handleInputChange={handleInputChange} />
                <CountrySections
                    handleRegionChange={handleRegionChange}
                    continenetsData={continenetsData}
                    subRegionsData={subRegionsData}
                    handleSubRegionChange={handleSubRegionChange}
                />
                <Sort value={"Sort By Population"} onSortEvent={sortByPopulation} sortedValue={populationData} />
                <Sort value={"Sort By Area"} onSortEvent={sortByArea} sortedValue={areaData} />

            </div>

            <div className="flex flex-wrap justify-between mx-20">
                { filterData.length >0 ? filterData.map((country) => {
                    return <CountriesCards countriesData={country} key={country.cca3} />
                }) : <h1 className='text-2xl'>No Filter data found</h1>}
            </div>
        </div>
    )
}

export default HomePage