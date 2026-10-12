import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import  { useTheme } from "../Contexts/themeContext";
function VideoPlayerPage() {
      const [Loading,setLoading] = useState(false)
      const { darkMode, toggleTheme } = useTheme();
    
    const id = useParams().videoId; // Get the video ID from the URL parameters
  
    const [video, setVideo] = useState(null); 


    // Function to add a view to the video
     const addViewInVideo=async()=>{
    try{
      const res=await fetch(`http://localhost:4000/video/view/${id}`,{
        method:"POST",
      })
      const data=await res.json()
      if(res.ok){
        console.log(data?.message)
        console.log("View added successfully")
      }}
      catch(err){
        console.log(err)
      }
    
    }
const viewedVideoId = useRef(null);

useEffect(() => {
    if (!id || viewedVideoId.current === id) return;

    viewedVideoId.current = id;
    addViewInVideo();
}, [id]);
  //Fetch video data using the video ID 
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


// Channel information code using video owner id
    const [channelInformation,setChannelInformation]=useState() 
    const getChannelInformationById=async()=>{
      try{
        setLoading(true)
        const res=await fetch(`http://localhost:4000/user/user-channel-info/${video?.owner}`);
        const data = await res.json()
        if(res.ok){
          setChannelInformation(data?.data)
          console.log("Channel information state updated:", channelInformation);
        }
        else{
          console.log("Failed to fetch channel information:", data.message);
        }

      }
      catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }
     }


// Channel subscriber code using video owner id
        const [channelSubscriber,setChannelSubscriber]=useState()
        const [subscriberInfo,setSubscriberInfo]=useState()
        const getChannelSubscriber=async()=>{
          try{
       
            const res=await fetch(`http://localhost:4000/user/channel-info/${video?.owner}`);
            const data = await res.json()
            if(res.ok){
              setChannelSubscriber(data?.data.subscriber)
              setSubscriberInfo(data?.data)
          }else{
            console.log("Failed to fetch channel subscriber:", data.message);
          }
        }
          catch(err){
            console.log(err)
          }
          
        }
        



  //Subscribe button code
  const handleSubscribe=async()=>{
    try{
      const res=await fetch(`http://localhost:4000/subscribe/subscribe-unSubscribe/${video?.owner}`,{
        method:"POST",
        credentials:"include"
      })
      const data=await res.json()
      if(res.ok){
        console.log(data?.message)
        getChannelSubscriber()
      }
      else{
        console.log(data?.message)
      }
    }
    catch(err){
      console.log(err)
    }
  }



     useEffect(()=>{
            getChannelInformationById()
            getChannelSubscriber()  
        },[video]);

       

        const timeAgo = (date) => {
  const minutes = Math.floor((Date.now() - new Date(date)) / 60000);

  if (minutes < 60) return `${minutes}mint ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};
      
  return (
    <main className={` transition-colors  duration-300 ${darkMode?"bg-gray-900 text-white":"bg-white text-gray-800"} min-h-screen`}>
    <div>
      <div className='p-2'>
           {video?.video ? (
        <video
          controls
           className="w-full max-w-3xl rounded-2xl p-2 h-70 md:h-120 object-contain bg-black"
          src={video.video}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
        <span className="text-xl font-semibold m-3 ">{video?.title}</span>
      <div className={`flex  items-center gap-10 ${darkMode?"text-white":"text-gray-800"}`}>
          <span className="flex items-center text-sm gap-2 pl-3 p-1"><img className='w-12 h-12 rounded-full' src={channelInformation?.profilePicture}/><p className="first-letter:uppercase "><strong className="text-semibold">{channelInformation?.fullName}</strong><br/>
        {`${channelSubscriber?.[0]?.subscriber || 0} subscribers `}
        </p></span>
        <span><button onClick={()=>handleSubscribe()} className={`${darkMode?"bg-gray-200 border-gray-900  text-black ":"bg-gray-800 border-gray-900  text-white"} border px-3 py-1 rounded-2xl transition-colors duration-300 cursor-pointer`}>Subscribe</button></span>
      </div>
        <div className={`p-3 max-w-3xl ${darkMode?"bg-gray-800 text-white":"bg-gray-200 text-gray-800"} rounded-md m-3`}>
          <span className="flex gap-8"><p>Views {video?.views}</p> <p>{timeAgo(video?.createdAt)}</p></span>
          <pre className="font-serif text-sm mt-2">
            {video?.description}
          </pre>
        </div>
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