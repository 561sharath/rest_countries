import React, { useContext } from 'react'
import { BsMoonFill } from "react-icons/bs";
import { ThemeChange } from '../context/Context';
import { MdOutlineWbSunny } from "react-icons/md";
import { Link } from 'react-router-dom';


const Header = () => {

  const { darkTheme, changeTheme } = useContext(ThemeChange)

  return (
    <div className={`${darkTheme ? 'bg-white text-black' : 'bg-[#202D36] text-white'} border-b-2`}>
      <div className='flex justify-between py-10'>
        <Link to="/">
          <h1 className='text-2xl font-bold mx-20'>Where in the World</h1>
        </Link>
        <button className='mx-20 flex justify-center' onClick={changeTheme}>{darkTheme ? <BsMoonFill /> : <MdOutlineWbSunny />}{darkTheme ? 'DarkMode' : 'LightMode'}</button>

      </div>
    </div>
  )
}

export default Header