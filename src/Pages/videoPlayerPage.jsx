import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import  { useTheme } from "../Contexts/themeContext";
import { useVideo } from "../Contexts/videoContext";
function VideoPlayerPage() {
      const [Loading,setLoading] = useState(false)
      const { darkMode, toggleTheme } = useTheme();
      const { videos, setVideos } = useVideo(); // Access videos and setVideos from VideoContext
    const [AllVideos, setAllVideos] = useState(null); // State to hold all videos
    const id = useParams().videoId; // Get the video ID from the URL parameters
  
    const [video, setVideo] = useState(null); 

    const [descriptionExpend, setDescriptionExpend] = useState(50); // State to control the number of characters displayed in the description

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
    setAllVideos(videos)
    addViewInVideo();
}, [id]);
  //Fetch video data using the video ID 
     const getVideo=async()=>{
        try {
        
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
  
          } 
     }

      
      useEffect(()=>{
            getVideo()
           
        },[])


// Channel information code using video owner id
    const [channelInformation,setChannelInformation]=useState() 
    const getChannelInformationById=async()=>{
      try{

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
            console.log("video",videos)
            getChannelSubscriber()  
        },[video]);

        //copy link code
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
    <div className='flex w-full flex-wrap'>
      <div className='w-full md:w-[90vh] p-2'>
           {video?.video ? (
        <video
          controls
           className="w-full max-w-4xl rounded-2xl p-2 h-70 md:h-120 object-contain bg-black"
          src={video.video}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
        <span className="text-xl pt-2 font-semibold m-4 ">{video?.title}</span>
      <div className={`flex  items-center gap-10 ${darkMode?"text-white":"text-gray-800"}`}>
          <span className="flex items-center text-sm gap-2 pl-3 p-1"><img className='w-12 h-12 rounded-full' src={channelInformation?.profilePicture}/><p className="first-letter:uppercase "><strong className="text-semibold">{channelInformation?.fullName}</strong><br/>
        {`${channelSubscriber?.[0]?.subscriber || 0} subscribers `}
        </p></span>
        <span><button onClick={()=>handleSubscribe()} className={`${darkMode?"bg-gray-200 border-gray-900  text-black ":"bg-gray-800 border-gray-900  text-white"} border px-3 py-1 rounded-2xl transition-colors duration-300 cursor-pointer`}>Subscribe</button></span>
      </div>
        <div className={`p-1 max-w-4xl ${darkMode?"bg-gray-800 text-white":"bg-gray-200 text-gray-800"} rounded-md m-3`}>
          <span className="flex gap-8 p-1"><p>Views {video?.views}</p> <p>{timeAgo(video?.createdAt)}</p></span>
          <p className="text-wrap text-sm  md:text-sm mt-1 p-1">
           <p > {video?.description.slice(0,descriptionExpend)} <strong onClick={()=>{
              if(descriptionExpend==50){
                setDescriptionExpend(video?.description.length)
              }
              else{
                setDescriptionExpend(50)
              }
            }} className="underline cursor-pointer">{descriptionExpend<video?.description.length ?"more..":"less"}</strong></p> 
          </p>
        </div>
      </div>

      <div className="min-h-screen p-2 ">
    {videos?.data?.toReversed().map((video)=>(
<div onClick={()=>{navigate(`/play/${video._id}`)}} key={video._id} className={` ${darkMode?"text-white hover:bg-gray-800 p-2 ":"text-black bg-gray-50 hover:bg-gray-200 p-2 " }cursor-pointer flex gap-2 flex-row md:flex-row rounded-sm  overflow-hidden  relative`} >
            <img src={video.thumbnailUrl} alt={video.title} className="w-44 md:w-65   shadow-sm  rounded-sm h-25 md:h-35 " />
            <span className="bg-black p-1 absolute text-sm  md:bottom-22 bottom-2 m w-13 left-2 rounded-sm shadow-md text-white"> {Math.round(video.duration)} sec</span>
            <div className="p-1">
              <h2 className="text-xs md:text-sm font-semibold line-clamp-2 mb-2">{video.title}</h2>
              <div className="flex gap-8 justify-between">
              <span className="text-xs md:text-sm flex gap-4">
                  <p className=""><strong>Views: </strong>{video.views}</p>
                <p>{timeAgo(video.createdAt)}</p>
              </span>
         <span className="text-sm mb-5 relative">
  <button onClick={() =>{
     setCopylink(copylink===video._id?null:video._id)

  }}>
    <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
  </button>

  {copylink ==video._id&& (
    <p onClick={()=>{
      copyVideoLink(video.video)
      setLinkPopup()
      setCopylink(null)

    }} className="absolute right-3 top-5 bg-black text-white p-1 duration-300  rounded-sm whitespace-nowrap">
      Copy link
    </p>
  )}
 
</span>
                </div>
            </div>
          </div>
            ))}
      </div>
    </div>
       {linkCopied&&(
       <div className="bg-black/30 justify-center flex items-center z-50 h-full fixed inset-0">
      <div className={`${darkMode?"bg-gray-800 ":"bg-gray-300"} rounded-md  animate-pulse p-2 h-20 w-40`}>
<p className={`font-bold text-center m-4 ${darkMode?"text-green-400":"text-green-600"}`}>Link Copied<i className="fa-solid fa-clipboard"></i></p>
      </div>
      </div>
     )}
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