import React, { useEffect, useState } from "react";
import { useTheme } from "../Contexts/themeContext"
import { useUser } from '../Contexts/userContext'
import { useNavigate } from "react-router-dom";

function ProfileVideos(){
      const { darkMode, toggleTheme } = useTheme();
        const {user,setUser} = useUser()
        const navigate = useNavigate()
  
    const [Loading,setLoading]=useState(false)
    const [myVideos,setMyVideos]=useState(null)
    const [video,setVideo]=useState()
    const [copylink ,setCopylink] = useState(null)
    function copyVideoLink(link){
      navigator.clipboard.writeText(link)
    }
    const [linkCopied,setLinkCopied]=useState(false)

   const [VideoDeleteConformation,setVideoDeleteConformation]=useState(false)
    
    
    function setLinkPopup(){
      setLinkCopied(true)
      setTimeout(() => {
        setLinkCopied(false)
    
      }, 1000);
    }
    useEffect(()=>{
        myVideosGet()

    },[])
    const myVideosGet=async()=>{
       try {
        setLoading(true)
         const res=await fetch("http://localhost:4000/video/get-user-video",{
            method:"GET",
            credentials:"include"
        })
        const data=await res.json()
        if(res.ok){
            setMyVideos(data?.data)
            setLoading(false)
            console.log('videos',data?.data)
            
          if(data?.data.length==0){
            setMyVideos(null)
          }
            console.log(data)
        }
        else{
            console.log(data?.message)
        }
       } catch (error) {
        console.log(error)
       }
       finally{
        setLoading(false)
       }

    }

    const deleteVideo=async(videoId)=>{
      try {
        setLoading(true)
        const res=await fetch(`http://localhost:4000/video/delete-video/${videoId}`,{
          method:"DELETE",
          credentials:"include"
        })
        const data=await res.json()
        if(res.ok){
          console.log(data)
          myVideosGet()
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    const timeAgo = (date) => {
  const minutes = Math.floor((Date.now() - new Date(date)) / 60000);

  if (minutes < 60) return `${minutes}mint ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};
    return(
        <main className={` transition-colors w-full absolute top-100 md:top-120 duration-300 ${darkMode?"bg-gray-900 text-white":"bg-white text-gray-800"} `}>
{
  user&&
  <div className="flex justify-between items-center m-3">
   <h3 className="text-2xl font-semibold  ml-6 ">Videos</h3>
   
  </div>
}

           <div className={`flex flex-wrap gap-2  m-3`}>

           {myVideos?.length>0?(myVideos?.map((video)=>(
<div key={video._id} className={`${darkMode?"text-white hover:bg-gray-800 p-2 ":"text-black bg-gray-50 hover:bg-gray-200 p-2 " }cursor-pointer flex gap-2 flex-row md:flex-col rounded-sm  overflow-hidden  relative`} >
            <img onClick={()=>{navigate(`/play/${video._id}`)}}  src={video.thumbnailUrl} alt={video.title} className="w-44 md:w-65   shadow-sm  rounded-sm h-25 md:h-35 " />
            <span className="bg-black p-1 absolute text-sm  md:bottom-24 bottom-3 m w-13 left-2 rounded-sm shadow-md text-white"> {Math.round(video.duration)} sec</span>
            <div  className="p-1">
              <h2 className="text-xs  md:text-sm font-semibold line-clamp-2 mb-2">{video?.title.slice(0,33)}..</h2>
              <div className="flex gap-5 ">
              <span className="text-xs md:text-sm flex gap-3">
                  <p className=""><strong>Views:</strong>{video.views}</p>
                <p>{timeAgo(video.createdAt)}</p>
              </span>
         <span className="text-sm  mb-5 relative">
  <button onClick={() =>{
     setCopylink(copylink===video._id?null:video._id)

  }}>
    <i className="fa-solid fa-ellipsis-vertical z-20 cursor-pointer"></i>
  </button>

  {copylink ==video._id&& (
    <button onClick={()=>{
     setVideoDeleteConformation(true)

    }} className="absolute cursor-pointer -right-15 top-4  bg-black text-white p-2 duration-300  rounded-md whitespace-nowrap">
  Delete
    </button>
    
  )}
 
</span>
                </div>
                    
  {VideoDeleteConformation && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">

    <div
      className={`w-full max-w-sm rounded-xl p-6 shadow-2xl border animate-in fade-in zoom-in duration-200
      ${
        darkMode
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >

      {/* Warning Icon */}
      <div className="flex justify-center mb-4">
        <div className={`h-14 w-14 rounded-full flex items-center justify-center
          ${darkMode ? "bg-red-500/10" : "bg-red-100"}`}>
          <i className="fa-solid fa-trash-can text-2xl text-red-500"></i>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-xl font-bold text-center mb-2">
        Delete Video?
      </h2>

      {/* Description */}
      <p className={`text-sm text-center leading-relaxed mb-6
        ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        Are you sure you want to delete this video?
        This action cannot be undone.
      </p>

      {/* Buttons */}
      <div className="flex gap-3">

        <button
          onClick={() => setVideoDeleteConformation(false)}
          className={`flex-1 py-2.5 rounded-lg font-semibold transition-colors
          ${
            darkMode
              ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          Cancel
        </button>

        <button
          onClick={()=>{
            deleteVideo(video._id)
            setVideoDeleteConformation(false)
          }}
          className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
        >
          <i className="fa-solid fa-trash-can mr-2"></i>
          Delete
        </button>

      </div>
    </div>
  </div>
)}
            </div>
          </div>
            ))):(
              user&&
              <div className="flex flex-col justify-center items-center w-full py-16 gap-3">

  <i className="fa-solid fa-clapperboard text-4xl text-gray-500"></i>

  <h2 className="text-lg font-semibold">
    No videos uploaded yet
  </h2>

  <p className="text-sm text-gray-400 text-center max-w-sm">
    Your videos will appear here once you upload your first video.
  </p>

  <button
    onClick={() => navigate("/create")}
    className={`mt-2 px-4  py-2 rounded-lg border 
      transition-colors ${darkMode ? "text-white bg-gray-800 hover:bg-gray-700 border-gray-700" : "border-gray-300 bg-gray-200 hover:bg-gray-300 text-black"}`}
  >
    <i className="fa-solid fa-plus mr-2"></i>
    Create Video
  </button>

</div>
            )}
            </div> 
              {
    Loading &&
       <div className="bg-black/50 justify-center flex items-center z-50 h-full fixed inset-0">
      <div className={`${darkMode?"bg-gray-800 ":"bg-gray-300"} rounded-md  animate-pulse p-2 h-20 w-40`}>
<p className={`font-bold text-center m-4 ${darkMode?"text-green-400":"text-green-600"}`}><i className="fa-solid fa-spinner animate-spin"></i></p>
      </div>
      </div>
}
 
   {linkCopied&&(
       <div className="bg-black/30 justify-center flex items-center z-50 h-full fixed inset-0">
      <div className={`${darkMode?"bg-gray-800 ":"bg-gray-300"} rounded-md  animate-pulse p-2 h-20 w-40`}>
<p className={`font-bold text-center m-4 ${darkMode?"text-green-400":"text-green-600"}`}>Link Copied<i className="fa-solid fa-clipboard"></i></p>
      </div>
      </div>
     )}
        </main>
    )
}

export {ProfileVideos}