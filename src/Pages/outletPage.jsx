import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import HeaderSection from "../components/headerSection";
import { useUser } from "../Contexts/userContext";
import  {useVideo} from  "../Contexts/videoContext"
import "../App.css"
function OutletPage() {
  const {user,setUser} = useUser()
useEffect(() => {
  console.log("USER CHANGED:", user)
}, [user])
  useEffect(()=>{
    if(!user){
    fetchUserData()
  }
  },[])
    const fetchUserData = async () => {
   try {
       const res = await fetch("http://localhost:4000/user/current-user",{
        method:"GET",
        credentials:"include"
    })
    .catch((err)=>{
        console.log(err)
    })
        console.log("Status:", res.status)
    const data = await res.json();
    if(res.ok){
      setUser(data.data)
      console.log("User data fetched successfully")
     
    }
    else{
      console.log("Failed to fetch user data",data)
    }
   } catch (error) {
    console.log(error)
   }finally{
    console.log("Fetch user data process completed",user)
   }
 
  
  
  }

    const {videos,setVideos} = useVideo()
        const getVideos = async () => {
          try {
    
              const res = await fetch(
                  "http://localhost:4000/video/get-all-videos"
              );
  
              const videoData = await res.json();
  
              console.log('videos',videoData.data);
  
              setVideos(videoData);
          } catch (error) {
              console.log(error);
           
          }
      };
   useEffect(() => {
  if(!videos){
    getVideos()}
  }, []);
  return (
    <div className='scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800'>
      <HeaderSection/>
      <Outlet />
    </div>
  );
}

export default OutletPage;