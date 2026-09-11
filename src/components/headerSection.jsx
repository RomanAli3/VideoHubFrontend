import { NavLink } from "react-router-dom"
import { useTheme } from "../Contexts/themeContext"
function HeaderSection() {
      const { darkMode, toggleTheme } = useTheme();

  return (
    <header className={` sticky top-0 z-50 ${ darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300" } border-b transition-colors duration-300`}>
       <div className="flex justify-between  flex-wrap items-center py-2 px-4 ">
<div className="logo flex gap-3 m-1 items-center">
        <span><img className="h-7 md:h-10" src="/favicon.png"/></span>
        <span><h1 className="text-md md:text-xl lg:text-2xl font-semibold">Video Hub</h1></span>
       </div>
       <div className="search-bar flex">
        <input type="text" placeholder="Search..." className={`border outline-0  indent-8  rounded-l-2xl w-40 md:w-80 py-1 ${darkMode?"bg-gray-800 border-gray-700 placeholder-gray-200":"bg-gray-100 border-gray-100 placeholder-gray-800"}`} />
        <button className={`py-1 px-1.5  cursor-pointer border   rounded-r-2xl ${darkMode?"bg-gray-800 border-gray-700 hover:border-gray-600":"bg-gray-100 hover:border-gray-300 border-gray-200"}`}><i className="fa-solid fa-magnifying-glass"></i></button>
       </div>
       <div className="flex gap-4 mt-1 text-sm poppins-extralight  items-center">
        <span>
            <button className=
            {`px-3  py-1 rounded-xl border cursor-pointer ${darkMode?"bg-gray-800 border-gray-700":"bg-gray-100 border-gray-100"}`}><i class="fa-solid fa-plus"></i> Create</button>
        </span>
        <span>
            <NavLink to='/' ><i className="fa-regular fa-house"></i> Home</NavLink>
        </span>
          <span>
            <NavLink to='/profile' ><i className="fa-regular fa-user"></i> Profile</NavLink>
        </span>
        <span>    
            <button onClick={toggleTheme} className="bg-transparent px-3 py-1  duration-300">
                 {darkMode ? "☀️" : "🌙"}
            </button>
        </span>
       </div>
       </div>
    </header>

  )}

export default HeaderSection 