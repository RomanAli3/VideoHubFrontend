import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import HeaderSection from "../components/headerSection";
import { useUser } from "../Contexts/userContext";

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
  return (
    <div>
      <HeaderSection/>
      <Outlet />
    </div>
  );
}

export default OutletPage;