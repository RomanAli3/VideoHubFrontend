import { NavLink } from "react-router-dom"
import { useTheme } from "../Contexts/themeContext"
import {useUser} from "../Contexts/userContext"
import {useState} from "react"
import { useNavigate } from "react-router-dom"

function HeaderSection() {
      const { darkMode, toggleTheme } = useTheme();
      const [videoForm,setVideoForm]=useState(false);
      const {user,setUser}=useUser()
      const navigate=useNavigate()

      //video form inputs 
      const [title,setTitle]=useState("")
      const [description,setDescription]=useState("")
      const [videoFile,setVideoFile]=useState(null)
      const [thumbnailFile,setThumbnailFile]=useState(null)

      const [error,setError]=useState(null)
      const [loading,setLoading]=useState(false)
      const handleVideoUpload=async(e)=>{
        e.preventDefault()
        setError("")
        if(!title.trim() || !description.trim()){
          setError("Please fill all the fields")
          return
        }
        if(videoFile==null){
          setError("Please select a video file")
          return
        }
        if(thumbnailFile==null){
          setError("Please select a thumbnail file")
          return
        }
        if(title.length<4 || title.length>120){
          setError("Title should be between 4 to 120 characters")
          return
        }
        if(description.length>300){
          setError("Description should be less than 300 characters")
          return
        }
        setLoading(true)
      const formdata=new FormData()
        formdata.append("title",title)
        formdata.append("description",description)
        formdata.append("video",videoFile)
        formdata.append("thumbnailUrl",thumbnailFile)
        try {
          const res = await fetch("http://localhost:4000/video/upload-video",
            {
              method: "POST",
              body: formdata,
              credentials: "include"
            }
          )
          const data = await res.json()
          if(res.ok){
            console.log(data)
            setVideoForm(false)
            setError("")
            setDescription("")
            setTitle("")
            setVideoFile(null)
            setThumbnailFile(null)
            setLoading(false)
          }
          else{
            setError(data?.message)
          }
        } catch (error) {
          console.log(error)
        }
    }
  return (
    <>
    <header className={` sticky top-0 z-50 ${ darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300" } border-b transition-colors duration-300`}>
       <div className="flex justify-between  flex-wrap items-center py-2 px-4 ">
<div className="logo flex gap-3 m-1 items-center">
        <span><img className="h-7 md:h-10" src="/favicon.png"/></span>
        <span><h1 className="text-md md:text-xl lg:text-2xl font-bold">VideoHub</h1></span>
       </div>
       <div className="search-bar  flex">
        <input type="text" placeholder="Search..." className={`border outline-0  indent-8  rounded-l-2xl w-40 md:w-80 py-1 ${darkMode?"bg-gray-800 border-gray-700 placeholder-gray-200":"bg-gray-100 border-gray-100 placeholder-gray-800"}`} />
        <button className={`py-1 px-1.5  cursor-pointer border   rounded-r-2xl ${darkMode?"bg-gray-800 border-gray-700 hover:border-gray-600":"bg-gray-100 hover:bg-gray-200 border-gray-100"}`}><i className="fa-solid fa-magnifying-glass"></i></button>
       </div>
       <div className="flex gap-4 mt-1 text-sm poppins-extralight   items-center">
        <span>
            <button onClick={()=>
            {if(user){
              setVideoForm(true)
            }
            else{
              navigate("/profile")

            }
          }} 
            className={`px-3  py-1 rounded-xl border cursor-pointer ${darkMode?"bg-gray-800 border-gray-700":"bg-gray-100 border-gray-100"}`}><i className="fa-solid fa-plus"></i> Create</button>
        </span>
        <span>
            <NavLink className={({isActive})=>isActive?"text-red-400 ":""} to='/' ><i className="fa-regular fa-house"></i> Home</NavLink>
        </span>
          <span>
            <NavLink className={({isActive})=>isActive?"text-red-400":""} to='/profile' ><i className="fa-regular fa-user"></i> Profile</NavLink>
        </span>
        <span>    
            <button onClick={toggleTheme} className="cursor-pointer bg-transparent px-3 py-1  duration-300">
                 {darkMode ? "☀️" : "🌙"}
            </button>
        </span>
       </div>
       </div>

    </header>
 {videoForm&&
  <div className={`bg-black/30 justify-center shadow-3xl  flex items-center m-2 z-10 h-full fixed inset-0 ${ darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-900 border-gray-300" } `}>
      <div className={`${darkMode?"bg-gray-800 shadow-gray-700 ":"bg-gray-100 shadow-gray-400"} relative  shadow-lg rounded-md  p-5 `}>
<div className="flex justify-center">
  <span className="flex justify-center items-center">
    <img src="/favicon.png" className="h-15 md:h-18"/>
<h2 className='text-xl md:text-2xl font-bold'>VideoHub</h2>
  </span>
</div><br/>
<div className="text-center">
  <p className=' text-2xl md:text-3xl font-bold'>Upload Your Video</p>
  <p className='text-sm mt-1'>Share Your Creativity With World</p>
</div>
<br/><br/>
<form onSubmit={handleVideoUpload} className="">

<div className="grid  grid-cols-2  gap-2">

  <input
    required
    type="text"
    placeholder="Title"
    maxLength={120}
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className={`${darkMode
      ? "bg-gray-800 border-gray-700 placeholder-gray-200 text-white"
      : "bg-gray-200 border-gray-200 placeholder-gray-800 text-black"
    } py-2 px-2 w-full rounded-lg outline-none border placeholder-gray-400`}
  />

  <input
    required
    type="text"
    placeholder="Description"
    maxLength={300}
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className={`${darkMode
      ? "bg-gray-800 border-gray-700 placeholder-gray-200 text-white"
      : "bg-gray-200 border-gray-200 placeholder-gray-800 text-black"
    } py-2 px-2 w-full rounded-lg outline-none border placeholder-gray-400`}
  />

  


 <div className={`${darkMode
      ? "bg-gray-800 border-gray-700 text-white"
      : "bg-gray-200 border-gray-200 text-black"
    } py-2 px-2 w-full   rounded-lg outline-none border`}>
  <label className='w-full cursor-pointer text-gray-400' for="thambnail-upload" >
   Upload Thambnail <i className="fa-regular fa-image text-red-500"></i><br/>
    {thumbnailFile
  ? <p className="text-gray-500">Selected: {thumbnailFile.name.slice(0,13)}..</p>
  : <p>Click to upload thumbnail</p>
}

    </label>
   <input
   id='thambnail-upload'

    type="file"
    accept="image/*"
    onChange={(e) => setThumbnailFile(e.target.files[0])}
    className={`${darkMode
      ? "bg-gray-800 border-gray-700 text-white"
      : "bg-gray-200 border-gray-200 text-black"
    } py-2 px-2 w-full  hidden rounded-lg outline-none border`}
  />
 </div>

  <div className={`${darkMode
      ? "bg-gray-800 border-gray-700 text-white"
      : "bg-gray-200 border-gray-200 text-black"
    } py-2 px-2 w-full   rounded-lg outline-none border`}>
  <label className='w-full text-gray-400 cursor-pointer' for="video-upload" >
    Upload Video <i className="fa-solid fa-video text-red-500"></i><br/>
    {videoFile
  ? <p className="text-gray-500">Selected: {videoFile.name.slice(0,13)}..</p>
  : <p>Click to upload video</p>}
    </label>
   <input
   id='video-upload'
  
    type="file"
    accept="video/*"
    onChange={(e) => setVideoFile(e.target.files[0])}
    className={`${darkMode
      ? "bg-gray-800 border-gray-700 text-white"
      : "bg-gray-200 border-gray-200 text-black"
    } py-2 px-2 w-full  hidden rounded-lg outline-none border`}
  />
 </div>
</div>

{error&&
<p className='text-sm text-red-600 p-1'>{error}</p>
}
<br/>
    
      <br/>
      <button type='submit' className={`${darkMode?"bg-red-500 border-gray-700 text-white":"bg-red-500 border-gray-100 text-white font-semibold"} py-2 px-3 w-full rounded-lg shadow-md poppins-extralight cursor-pointer hover:shadow-lg transition-shadow duration-300`}>Upload</button>
      
</form>
<button onClick={()=>{
  setVideoForm(false)
  setError("")
  setDescription("")
  setTitle("")
  setVideoFile(null)
  setThumbnailFile(null)
}} className=' absolute top-5 cursor-pointer  right-3'>
        <i className="fa-solid fa-xmark"></i>
        </button>


      </div>
      </div>
  }
   {loading &&
       <div className="bg-black/50 justify-center flex items-center z-50 h-full fixed inset-0">
      <div className={`${darkMode?"bg-gray-800 ":"bg-gray-300"} rounded-md  animate-pulse p-2 h-20 w-40`}>
<p className={`font-bold text-center m-4 ${darkMode?"text-green-400":"text-green-600"}`}><i className="fa-solid fa-spinner animate-spin"></i></p>
      </div>
      </div>
}

</>
  );
}

export default HeaderSection 