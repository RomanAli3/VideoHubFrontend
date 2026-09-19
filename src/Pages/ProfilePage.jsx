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

  {/*changeCoverImage section code */}
  const [isSelectCoverImage,setIsSelectCoverImage]=useState(false)
  const [updateCoverImage,setUpdateCoverImage]=useState()
  const handleUpdateCoverImage=async()=>{
    if(!updateCoverImage){
      setError("please select cover Image")
      return
    }
    const formData = new FormData();

    formData.append("coverImage",updateCoverImage)

 try {
  setLoading(true)
     const res =await fetch("http://localhost:4000/user/change-cover-image",{
      method:"PATCH",
      credentials:"include",
      body:formData
    })
    const data= await res.json()

    if(res.ok){
      setIsSelectCoverImage(false)
      setLoading(false)
      window.location.reload()
    }
    else{
      setError("Error while uploading! update your time")
      return
    }
    setUpdateCoverImage()
 } catch (error) {
      setError("Error while uploading! update your time")
  console.log(error)
  return
 }
 finally{
    setLoading(false)
   }




   
  }

  {/*changeProfileImage section code */}
  const [isSelectProfileImage,setIsSelectProfileImage]=useState(false)
  const [updateProfileImage,setUpdateProfileImage]=useState()
const handleUpdateProfileImage=async()=>{
    if(!updateProfileImage){
      setError("please select cover Image")
      return
    }
    const formData = new FormData();

    formData.append("profilePicture",updateProfileImage)

 try {
  setLoading(true)
     const res =await fetch("http://localhost:4000/user/change-profile-picture",{
      method:"PATCH",
      credentials:"include",
      body:formData
    })
    const data= await res.json()

    if(res.ok){
      setIsSelectProfileImage(false)
      setLoading(false)
      window.location.reload()
    }
    else{
      setError("Error while uploading! update your time")
      return
    }
    setUpdateProfileImage()
 } catch (error) {
  console.log(error)
      setError("Error while uploading! update your time")
  return
 }
 finally{
    setLoading(false)
   }




   
  }



const [descriptionOpen,setDescriptionOpen]=useState(false)
  return (
 <main className={` transition-colors  duration-300 ${darkMode?"bg-gray-900 text-white":"bg-white text-gray-800"} min-h-screen`}>
  {user?<div className='relative '>
    <div>
      <img className='w-full object-cover relative   h-40 md:h-55 rounded-2xl p-2' src={user?.coverImage}/>
      <div className={`h-10 cursor-pointer w-10 ${darkMode?"bg-gray-700":"bg-gray-300"} absolute bottom-2 right-4 z-40 flex items-center justify-center rounded-full`}  onClick={()=>setIsSelectCoverImage(true)}><i className="fa-solid fa-camera"></i></div>
    </div>
  <div className={`flex border-b ${ darkMode?" border-gray-700":"border-gray-200"} absolute items-center w-full flex-wrap p-1  justify-between top-38 md:top-45`}>
     <div className='m-3 flex items-center gap-6'>
     <div className={`${darkMode?" border-blue-800":"border-black"} backdrop-blur-sm  h-30 md:h-40  w-30 md:w-40 rounded-full border`}>
      <img className='h-30 md:h-40 relative  w-30 md:w-40 rounded-full' src={user?.profilePicture}/>
       <div className={`h-7 cursor-pointer w-7 ${darkMode?"bg-gray-700":"bg-gray-300"} absolute bottom-2 right-4 z-40 flex items-center justify-center rounded-full`}  onClick={()=>setIsSelectProfileImage(true)}><i className="fa-solid fa-camera"></i></div>
</div>
<div className=''> 
  <h4 className='text-xl md:text-3xl font-semibold'>{user?.fullName}</h4>
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
      
     

      <p className="text-sm text-center mt-6 wrap-break-words">
        <strong>Description:</strong>
        <br />
        {user?.description}
      </p>
<button onClick={()=>setDescriptionOpen(false)} className=' absolute top-3 cursor-pointer text-red-500 right-2'>
        <i className="fa-solid fa-xmark"></i>
        </button>
    </div>
  </div>
)}
   </div>
   <div className='ml-4 md:mr-3'>
    <button className={`px-3 py-1 rounded-3xl bg-transparent border font-semibold ${darkMode?"border-gray-700":"border-gray-400"}`}>Update Info </button>
   </div>
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
        <i className="fa-solid fa-xmark"></i>
        </button>


      </div>
      </div>
  }
  {
    Loading &&
       <div className="bg-black/50 justify-center flex items-center z-50 h-full fixed inset-0">
      <div className={`${darkMode?"bg-gray-800 ":"bg-gray-300"} rounded-md  animate-pulse p-2 h-20 w-40`}>
<p className={`font-bold text-center m-4 ${darkMode?"text-green-400":"text-green-600"}`}><i className="fa-solid fa-spinner animate-spin"></i></p>
      </div>
      </div>
}

  {
    isSelectCoverImage &&
       <div className="bg-black/50 justify-center flex items-center z-40 h-full fixed inset-0">
      <div className={`${darkMode?"bg-gray-800 ":"bg-gray-300"} relative rounded-md flex items-center flex-col justify-center   p-2 h-75 w-75`}>
        <h4>Select Cover Image</h4><br/>

<div className={`h-15 w-15 ${darkMode?"bg-gray-700":"bg-gray-100 text-black"} relative  flex items-center justify-center rounded-full`}><i className="fa-solid fa-camera">
  <input type='file' className=' absolute inset-0 opacity-0 cursor-pointer'
  onChange={(e)=>setUpdateCoverImage(e.target.files[0])}
  accept="image/*" />
</i>
</div><br/>
{error?<p className='text-xs mx-w-65 text-red-500 text-center'>{error}</p>:<p className='text-xs text-center mx-w-65'>{updateCoverImage?.name}</p>}
<br/>

 <button
        onClick={()=>{
          setIsSelectCoverImage(false)
        setUpdateCoverImage()
        }}
        className="absolute top-3 right-3 cursor-pointer"
      >
        <i className="fa-solid fa-xmark text-red-400"></i>
      </button>
      <button onClick={()=>handleUpdateCoverImage()} className={`${darkMode?"bg-red-500 border-gray-700 text-white":"bg-red-500 border-gray-100 text-white"} py-1 px-3 mt-2 rounded-lg shadow-md poppins-extralight cursor-pointer hover:shadow-lg transition-shadow duration-300`}>Update Image</button>
      </div>
      </div>
}
  {
    isSelectProfileImage &&
       <div className="bg-black/50 justify-center flex items-center z-40 h-full fixed inset-0">
      <div className={`${darkMode?"bg-gray-800 ":"bg-gray-300"} relative rounded-md flex items-center flex-col justify-center   p-2 h-75 w-75`}>
        <h4>Select Profile Picture</h4><br/>
<div className={`h-15 w-15 ${darkMode?"bg-gray-700":"bg-gray-100 text-black"} relative  flex items-center justify-center rounded-full`}><i className="fa-solid fa-camera">
  <input type='file' className=' absolute inset-0 opacity-0 cursor-pointer'
  onChange={(e)=>setUpdateProfileImage(e.target.files[0])}
  accept="image/*" />
</i>
</div><br/>
{error?<p className='text-xs mx-w-65 text-red-500 text-center'>{error}</p>:<p className='text-xs text-center mx-w-65'>{updateProfileImage?.name}</p>}
<br/>

 <button
        onClick={()=>{
          setIsSelectProfileImage(false)
          setUpdateProfileImage()
        }}
        className="absolute top-3 right-3 cursor-pointer"
      >
        <i className="fa-solid fa-xmark text-red-400"></i>
      </button>
      <button onClick={()=>handleUpdateProfileImage()} className={`${darkMode?"bg-red-500 border-gray-700 text-white":"bg-red-500 border-gray-100 text-white"} py-1 px-3 mt-2 rounded-lg shadow-md poppins-extralight cursor-pointer hover:shadow-lg transition-shadow duration-300`}>Update Image</button>
      </div>
      </div>
}

 </main>
  )
}

export default ProfilePage