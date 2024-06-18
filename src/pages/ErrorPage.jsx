import React, { useContext } from 'react'
import { ThemeChange } from '../context/Context'

const ErrorPage = () => {
  let {darkTheme} = useContext(ThemeChange)
  return (
    <div className={`${darkTheme ? 'bg-white text-black' : 'bg-[#202D36] text-white'} h-[100vh]`}>
        <div className='text-7xl text-yellow-500 ml-20'>
            404 Page not found
        </div>
    </div>
  )
}

export default ErrorPage