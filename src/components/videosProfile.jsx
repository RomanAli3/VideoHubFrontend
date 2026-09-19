import React, { useEffect, useState } from "react";
import { useTheme } from "../Contexts/themeContext"

function ProfileVideos(){
      const { darkMode, toggleTheme } = useTheme();
    const [Loading,setLoading]=useState(false)
    const [video,setVideo]=useState()
    const [copylink ,setCopylink] = useState(null)
    function copyVideoLink(link){
      navigator.clipboard.writeText(link)
    }
    
    const [linkCopied,setLinkCopied]=useState(false)
    
    function setLinkPopup(){
      setLinkCopied(true)
      setTimeout(() => {
        setLinkCopied(false)
    
      }, 1000);
    }
    useEffect(()=>{
        myVideos()
    },[])
    const myVideos=async()=>{
       try {
        setLoading(true)
         const res=await fetch("http://localhost:4000/video/get-user-video",{
            method:"GET",
            credentials:"include"
        })
        const data=await res.json()
        if(res.ok){
            setVideo(data?.data)
            setLoading(false)
            console.log(data?.data)
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
    const timeAgo = (date) => {
  const minutes = Math.floor((Date.now() - new Date(date)) / 60000);

  if (minutes < 60) return `${minutes}mint ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};
    return(
        <main className={` transition-colors absolute top-120 duration-300 ${darkMode?"bg-gray-900 text-white":"bg-white text-gray-800"} `}>
           <div className="flex flex-wrap ">
            {video?.map((video)=>(
                <div key={video._id} className={`${darkMode?"text-white hover:bg-gray-800 p-2 ":"text-black bg-gray-50 hover:bg-gray-100 p-2 " }cursor-pointer rounded-sm  overflow-hidden`} >
            <img src={video.thumbnailUrl} alt={video.title} className="w-full   shadow-sm  rounded-sm h-48 object-cover" />
            <span className="bg-black p-1 relative bottom-8  left-2 rounded-sm shadow-md text-white"> {Math.round(video.duration)} sec</span>
            <div className="p-1">
              <h2 className="text-md font-semibold mb-2">{video.title}</h2>
              <div className="flex justify-between">
              <span className="text-sm flex gap-5">
                  <p className=""><strong>Views: </strong>{video.views}</p>
                <p>{timeAgo(video.createdAt)}</p>
              </span>
         <span className="text-sm mb-5 relative">
  <button onClick={() => setCopylink(copylink===video._id?null:video._id)}>
    <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
  </button>

  {copylink ==video._id&& (
    <p onClick={()=>{
      copyVideoLink(video.video)
      setLinkPopup()
      setCopylink(null)

    }} className="absolute right-3 top-3 bg-black text-white p-2 duration-300  rounded-sm whitespace-nowrap">
      Copy link
    </p>
  )}
</span>
                </div>
            </div>
          </div>
            ))}
            </div> 
              {
    Loading &&
       <div className="bg-black/50 justify-center flex items-center z-50 h-full fixed inset-0">
      <div className={`${darkMode?"bg-gray-800 ":"bg-gray-300"} rounded-md  animate-pulse p-2 h-20 w-40`}>
<p className={`font-bold text-center m-4 ${darkMode?"text-green-400":"text-green-600"}`}><i className="fa-solid fa-spinner animate-spin"></i></p>
      </div>
      </div>
}
        </main>
    )
}

export {ProfileVideos}