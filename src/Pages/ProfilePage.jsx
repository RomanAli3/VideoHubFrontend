import React from 'react'
import {useTheme} from "../Contexts/themeContext"
import {useState} from 'react'
import { useUser } from '../Contexts/userContext'
import { useVideo } from '../Contexts/videoContext'
function ProfilePage() {
  const { darkMode, toggleTheme } = useTheme();
  const {videos,setVideos} = useVideo()
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm,setLoginForm] = useState(false)
  const {user,setUser} = useUser()
  const [Loading,setLoading] = useState(false)

{/*Login section code */}
  const [LoginUsernameOrEmail,setLoginUsernameOrEmail] = useState("")
  const [LoginPassword,setLoginPassword] = useState("")

  const [error, setError] = useState("")
  const handleLogin = async (e) => {
      e.preventDefault();
    if(LoginUsernameOrEmail.trim()===""||LoginPassword.trim()===""){
      alert("Please fill all the fields")
      return
    }
    if(LoginPassword.trim().length<6){
      setError("Password must be 6 characters")
      return
    }
     if(LoginUsernameOrEmail.includes("@")){
      var loginData={
        email:LoginUsernameOrEmail,
        password:LoginPassword
      }
    }
    else{
      var loginData={
        userName:LoginUsernameOrEmail,
        password:LoginPassword
      }
    }
   try {
      setLoading(true)
setError("")
    const res = await fetch("http://localhost:4000/user/login",{
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(loginData)
  })
  const data = await res.json()

  if (res.ok) {
   setUser(data.data)
    setLoginForm(false)
   window.location.reload()

} else {
   setError(data.message)
   console.log(data.message)
   return
}
setLoading(false)
  setLoginUsernameOrEmail("")
  setLoginPassword("")
   } catch (error) {
    console.log(error)
   }
   finally{
    setLoading(false)
    console.log(user)
   
   }

  }


const [descriptionOpen,setDescriptionOpen]=useState(false)
  return (
 <main className={` transition-colors  duration-300 ${darkMode?"bg-gray-900 text-white":"bg-white text-gray-800"} min-h-screen`}>
  {user?<div className='relative '>
    <div>
      <img className='w-full   h-45 md:h-60 rounded-2xl p-2' src={user?.coverImage}/>
    </div>
   <div className='m-3 absolute items-center flex  gap-6 top-42 md:top-50'>
     <div className={`${darkMode?" border-blue-800":"border-black"} backdrop-blur-sm  h-30 md:h-40  w-30 md:w-40 rounded-full border`}>
      <img className='h-30 md:h-40  w-30 md:w-40 rounded-full' src={user?.profilePicture}/>
</div>
<div className=''> 
  <h4 className='text-xl md:text-3xl font-semibold'>{user?.fullName} <i className="fa-solid fa-pencil text-sm cursor-pointer"></i></h4>
  <h4 className='text-sm md:text-md '>@{user?.fullName}</h4>
  <p className='text-sm text-wrap w-40 md:w-full max-w-auto'>{user?.description?.split(" ").slice(0, 7).join(" ")} <strong onClick={()=>setDescriptionOpen(true)} className='cursor-pointer whitespace-nowrap underline'>{!descriptionOpen&&"..more"}</strong></p>
 <p>
 </p> 
</div>
{descriptionOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
    
    <div
      className={`relative w-full max-w-md max-h-[80vh] overflow-y-auto rounded-md p-5 ${
        darkMode ? "bg-gray-900/95 text-white" : "bg-gray-300 text-black"
      }`}
    >
      
      <button
        onClick={() => setDescriptionOpen(false)}
        className="absolute top-3 right-3 cursor-pointer"
      >
        <i className="fa-regular fa-circle-xmark text-red-400"></i>
      </button>

      <p className="text-sm text-center mt-6 wrap-break-words">
        <strong>Description:</strong>
        <br />
        {user?.description}
      </p>

    </div>
  </div>
)}
   </div>
  </div>:
  <div className='items-center min-h-screen flex justify-center'>
  <div clasName="flex justify-center items-center text-center flex-col">
    <button onClick={()=>{setLoginForm(true)}} className={`${darkMode?"border-gray-800 text-white":"border-gray-200 text-black"} border mb-8 px-3 py-1 rounded-lg shadow-md poppins-extralight cursor-pointer hover:shadow-lg transition-shadow duration-300`}>
      Sign in <i className="fa-solid fa-arrow-right-to-bracket"></i>
    </button>
  </div></div>}
  {loginForm&&
  <div className="bg-black/30 justify-center flex items-center z-50 h-full fixed inset-0">
      <div className={`${darkMode?"bg-gray-800 ":"bg-gray-100"} relative rounded-md  p-5 `}>
<div className="flex justify-center">
  <span className="flex justify-center items-center">
    <img src="/favicon.png" className="h-15 md:h-18"/>
<h2 className='text-xl md:text-2xl font-bold'>VideoHub</h2>
  </span>
</div><br/>
<div className="text-center">
  <p className=' text-2xl md:text-3xl font-semibold'>Welcome Back👋🏻</p>
  <p className='text-sm mt-1'>Sign in to continue to your account</p>
</div>
<br/><br/>
<form onSubmit={handleLogin}>
<div className='flex flex-col gap-3'>
<input required type="text" placeholder='Email or Username' value={LoginUsernameOrEmail} onChange={(e)=>setLoginUsernameOrEmail(e.target.value)} className={`${darkMode?"bg-gray-800 border-gray-700 placeholder-gray-200 text-white":"bg-gray-200 border-gray-200 placeholder-gray-800 text-black"} py-2 px-2 w-60 md:w-90  rounded-lg outline-none border`} />

<input required type={showPassword?"text":"password"} placeholder='Password' value={LoginPassword} onChange={(e)=>setLoginPassword(e.target.value)} className={`${darkMode?"bg-gray-800 border-gray-700 placeholder-gray-200 text-white":"bg-gray-200 border-gray-200 placeholder-gray-800 text-black"} w-60 md:w-90 py-2 px-2 rounded-lg outline-none border`} />
</div>
{error&&
<p className='text-sm text-red-600 p-1'>{error}</p>
}
<br/>
      <span className='p-2 flex items-center gap-1'><input onChange={(e)=>setShowPassword(!showPassword)} type='checkbox' />
      <label className='text-sm'>Show password</label>
      </span>
      <br/>
      <button type='submit' className={`${darkMode?"bg-red-500 border-gray-700 text-white":"bg-red-500 border-gray-100 text-white"} py-2 px-3 w-full rounded-lg shadow-md poppins-extralight cursor-pointer hover:shadow-lg transition-shadow duration-300`}>Sign in</button>
      <br/>
      <p className='text-center mt-2'>Don't have an account <button className='underline text-red-400 cursor-pointer font-semibold '>Sign up</button></p>
</form>
<button onClick={()=>setLoginForm(false)} className=' absolute top-5 cursor-pointer  left-60 md:left-90'>
        <i className="fa-regular fa-circle-xmark"></i>
        </button>


      </div>
      </div>
  }
  {
    Loading &&
       <div className="bg-black/30 justify-center flex items-center z-50 h-full fixed inset-0">
      <div className={`${darkMode?"bg-gray-800 ":"bg-gray-300"} rounded-md  animate-pulse p-2 h-20 w-40`}>
<p className={`font-bold text-center m-4 ${darkMode?"text-green-400":"text-green-600"}`}><i className="fa-solid fa-spinner animate-spin"></i></p>
      </div>
      </div>
}


 </main>
  )
}

export default ProfilePage