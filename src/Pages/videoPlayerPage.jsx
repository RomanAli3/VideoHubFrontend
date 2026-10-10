import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import  { useTheme } from "../Contexts/themeContext";
function VideoPlayerPage() {
      const [Loading,setLoading] = useState(false)
      const { darkMode, toggleTheme } = useTheme();
    
    const id = useParams().videoId; // Get the video ID from the URL parameters
    console.log("Video ID:", id);
    const [video, setVideo] = useState(null); // State to hold the video data
     const getVideo=async()=>{
        try {
            setLoading(true)
         const res = await fetch(`http://localhost:4000/video/single-video/${id}`);
            const data = await res.json();
            if(res.ok){
                setVideo(data?.data);
                console.log("Video state updated:", video);
            } else {
                console.log("Failed to fetch video data:", data.message);
            }
        }
        catch(err){
            console.log(err)
        }finally{
           setLoading(false)
        } 
     }
     
     useEffect(()=>{
            getVideo()
        },[])
        useEffect(() => {
  console.log("Updated video:", video);
}, [video]);
  return (
    <main className={` transition-colors  duration-300 ${darkMode?"bg-gray-900 text-white":"bg-white text-gray-800"} min-h-screen`}>
    <div>
      <div className='p-2'>
           {video?.video ? (
        <video
          controls
           className="w-full max-w-3xl rounded-2xl p-2 h-120 object-contain bg-black"
          src={video.video}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
        <span className="text-xl font-semibold ml-5 mt-2">{video?.title}</span>
      </div>
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
  );
}

export default VideoPlayerPage