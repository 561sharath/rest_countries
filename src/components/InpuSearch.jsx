import React, { useContext } from 'react'
import { ThemeChange } from '../context/Context'

const InpuSearch = ({ handleInputChange,inputData}) => {

    const handleInput = (e) => {
        const inputDataEnter = e.target.value
        handleInputChange(inputDataEnter.trim())
    }
    const {darkTheme} = useContext(ThemeChange)
    return (
        <div className={`${darkTheme ? 'bg-white' : 'bg-[#202D36]'}`}>
            <section className="serach-section px-10 py-5 mb-5 items-center ">
                <div className="flex rounded-lg mb-4" id="search-box">
                    <input type="text" placeholder="search your country" value={inputData} className={`py-5 w-[25vw] px-5 rounded-lg  border-none  shadow-lg ${darkTheme ? 'bg-white text-black' : 'bg-[#2B3743] text-white'}`} onChange={handleInput} />
                </div>
            </section>

        </div>
    )
}

export default InpuSearch