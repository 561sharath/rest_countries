import React, { useContext } from 'react'
import { ThemeChange } from '../context/Context'

const CountrySections = ({handleRegionChange,continenetsData,subRegionsData,handleSubRegionChange}) => {

    const handleChange = (e) => {
        const region = e.target.value
        let subregionselect = document.getElementById('subRegion')
        if (region != "default"){
            subregionselect.style.display = "block"
        }else{
            subregionselect.style.display = "none"
        }
        handleRegionChange(region)
    }

    const handleSubRegion = (e) => {
        const subregion = e.target.value
        handleSubRegionChange(subregion)

    }
    
    let {darkTheme} = useContext(ThemeChange)
    

    return (
        <div className={`${darkTheme ? 'bg-white' : 'bg-[#202D36]'}`}>
            <section className="serach-section flex justify-between px-10 py-5 mb-5 items-center my-2">
                
                <select className={`px-2 mx-5 py-5 rounded-md  shadow-lg  mt-[-10px] ${darkTheme ? 'bg-white text-black': 'bg-[#2B3743] text-white' }`} onChange={handleChange}>
                    
                    <option value="default">Filter By Region</option>
                    {continenetsData.map((continent) => 
                         <option value={continent} key={continent}>{continent}</option>
                    )}

                </select>

                <select id='subRegion' className={`px-2  py-5  rounded-md  shadow-lg  mt-[-10px] ${darkTheme ? 'bg-white text-black': 'bg-[#2B3743] text-white' }`} style={{display:'none'}} onClick={handleSubRegion}>
                    <option value="default">Filter By SubRegion</option>
                        {subRegionsData.map((subregion) => 
                            <option value={subregion} key={subregion}>{subregion}</option>
                        )}
                </select >
            </section>
        </div>
    )
}

export default CountrySections