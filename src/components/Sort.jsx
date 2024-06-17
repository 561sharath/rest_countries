import React, { useContext } from 'react'
import { ThemeChange } from '../context/Context'

const Sort = ({value,onSortEvent,sortedValue}) => {
    const  handleSort = (e) =>{
        const populationSortType = e.target.value
        
        onSortEvent(populationSortType)
    }
    let {darkTheme} = useContext(ThemeChange)
    return (
        <div className={`${darkTheme ? 'bg-white' : 'bg-[#202D36]'} px-10 py-5 mb-5 items-center  my-2`}>
            <select className={`px-2 mx-5 py-5 rounded-md  shadow-lg mt-[-10px] ${darkTheme ? 'bg-white text-black' : 'bg-[#2B3743] text-white'}`} onChange={handleSort}>
                <option value="default" selected={sortedValue === "default"}>{value}</option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>
        </div>
    )
}

export default Sort