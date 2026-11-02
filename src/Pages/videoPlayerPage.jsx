import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import  { useTheme } from "../Contexts/themeContext";
import {useUser} from "../Contexts/userContext"
import { useVideo } from "../Contexts/videoContext";
function VideoPlayerPage() {

      const { darkMode, toggleTheme } = useTheme();
      const { videos, setVideos } = useVideo(); // Access videos and setVideos from VideoContext

    const id = useParams().videoId; // Get the video ID from the URL parameters
  
    const {user,setUser}=useUser()
    const [video, setVideo] = useState(null); 
    const navigate = useNavigate() // Initialize the navigate function from react-router-dom

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
               getVideo()
            getChannelInformationById()
            getChannelSubscriber()  

        },[id]);

       

        {/*GET VIDEO COMMENTS  */}
        const [comments ,setComments]=useState(null)
        const getALlVideoComments=async()=>{
          setComments(null)
          try {
            const res = await fetch(`http://localhost:4000/comment/get-video-comments/${id}`)
            const data=await res.json()
            if(res.ok){
              console.log("comments",data)
              setComments(data.data)
            }
          } catch (error) {
            console.log(error)
          }
        }

        useEffect(()=>{
          getALlVideoComments()
        },[id],[comments])

         const [commentError,setCommentError]=useState("Comment")
        const [commentText,setCommentText]=useState("")
        const uploadComment=async(e)=>{
         
          if(!commentText.trim()){
           setCommentError("Enter text")
            return
          }
          try {
            const res=await fetch(`http://localhost:4000/comment/post-comment/${id}`,{
              method:"POST",
        credentials:"include",
       headers: {
        'Content-Type': 'application/json'
    },
     body: JSON.stringify({content:commentText})
            })
            const data = await res.json()
            if(res.ok){
              console.log("Successfully uploaded comment",data)
              setCommentError("Uploaded")
            }
          } catch (error) {
            console.log(error)
          }
          finally{
            setCommentError("Comment")
            setCommentText("")
            getALlVideoComments()
          }
        }


        const DeleteComment=async(commentId)=>{
          try {
            const res=await fetch(`http://localhost:4000/comment/delete-comment/${commentId}`,{
              method:"DELETE",
              credentials:"include"
            })
            const data=await res.json()
            if(res.ok){
              console.log("Successfully deleted comment",data)
            }
          } catch (error) {
            console.log(error)
          }finally{
            getALlVideoComments()
          }
        }
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
    <div className='flex w-full flex-col md:flex-row'>
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
        <span className="text-xs md:text-xl
        
        pt-2 font-semibold m-4 ">{video?.title}</span>
      <div className={`flex  items-center gap-15  ${darkMode?"text-white":"text-gray-800"}`}>
          <span className="flex items-center text-sm gap-2 pl-3 p-1"><img className='w-12 h-12 rounded-full' src={channelInformation?.profilePicture}/><p className="first-letter:uppercase "><strong className="text-semibold">{channelInformation?.fullName}</strong><br/>
        {`${channelSubscriber?.[0]?.subscriber || 0} subscribers `}
        </p></span>
        <span><button onClick={()=>handleSubscribe()} className={`${darkMode?"bg-gray-200 border-gray-900  text-black ":"bg-gray-800 border-gray-900  text-white"} border px-3 py-1 rounded-2xl transition-colors duration-300 cursor-pointer`}>Subscribe</button></span>
      </div>
        <div className={`p-1 max-w-4xl ${darkMode?"bg-gray-800 text-white":"bg-gray-200 text-gray-800"} rounded-md m-3`}>
          <span className="flex text-xs md:text-sm gap-8 p-1"><p>Views {video?.views}</p> <p>{timeAgo(video?.createdAt)}</p></span>
          <p className="text-wrap text-xs  md:text-sm p-1">
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
<form  action={uploadComment}>

     <div className="flex items-center gap-3 max-w-4xl p-3">
  <img
    className="h-10 w-10 rounded-full object-cover"
    src={user?.profilePicture}
    alt="Profile"
  />

  <input
    value={commentText}
    onChange={(e) => setCommentText(e.target.value)}
    placeholder="Add a comment..."
    className="flex-1 min-w-0 bg-transparent border-b border-gray-600 
    px-2 py-2 text-white outline-none focus:border-gray-500 
    placeholder:text-gray-400 transition-colors"
    type="text"
  />

  <button
   type="submit"
   
    className={`rounded-full  px-5 py-2 text-sm font-medium 
    transition cursor-pointer  duration-300 ${darkMode?"text-white bg-gray-800":"text-black bg-gray-400"}
    disabled:cursor-not-allowed disabled:opacity-50`}
  >
    {commentError}
  </button>
</div>
  </form>

  
<div className={`${darkMode ? "bg-gray-800" : "bg-gray-300"} transition-colors  duration-300 rounded-lg p-2 m-3`}>
  <h4 className="text-xl m-2 font-bold">Comments</h4>
  
  {comments && comments.length > 0 ? (
    <div className="flex flex-col gap-2">
      {comments.toReversed().map((comment) => (
        <div className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg  p-1`}>
      <span className="flex gap-2 items-center opacity-80 capitalize">
      <img src={comment?.user.profilePicture}  className="w-7 h-7 rounded-full"/>
      <p>{comment?.user.fullName} </p> <p className="text-xs"> {timeAgo(comment?.createdAt)}</p>
      </span>
        <span 
          key={comment._id || comment.content} 
          className={`flex justify-between  m-1`}
        >
   
      <p className="font-semibold ml-6"> {comment?.content} </p>  {comment?.user._id==user?._id&&(<i onClick={()=>DeleteComment(comment._id)}  className="fa-solid fa-trash-can cursor-pointer"></i>)}
        </span>
        <span>
          
        </span>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-sm m-2 opacity-70">No comments yet.</p>
  )}
</div>

      </div>

      <div className="min-h-screen p-2 ">
    {videos?.data?.toReversed().map((video)=>(
<div onClick={()=>navigate(`/play/${video._id}`)} key={video._id} className={` ${darkMode?"text-white hover:bg-gray-800 p-2 ":"text-black bg-gray-50 hover:bg-gray-200 p-2 " }cursor-pointer flex gap-2 flex-row  md:flex-row rounded-sm  overflow-hidden  m-2 md:m-1 relative`} >
            <img src={video.thumbnailUrl} alt={video.title} className="w-42 md:w-65   shadow-sm  rounded-sm h-25 md:h-35 " />
            <span className="bg-black p-1 absolute md:top-30 text-sm top-22  md:left-53 m w-13 left-32 rounded-sm shadow-md text-white"> {Math.round(video.duration)} sec</span>
            <div className="p-1">
              <h2 className="text-xs md:text-sm font-semibold line-clamp-2 mb-2">{video.title}</h2>
              <div className="flex gap-12 ">
              <span className="text-xs md:text-sm  gap-2 flex ">
                  <p className=""><strong>Views:</strong>{video.views}</p>
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
      
    </main>
  );
}

export default VideoPlayerPage