import { createContext ,useContext,useState } from "react";

export const VideoContext = createContext();

export const VideoContextProvider = ({children})=>{

    const [videos,setVideos] = useState(null)

    return(
        <VideoContext.Provider value={{videos,setVideos}}>
            {children}
        </VideoContext.Provider>
    )
}

export const useVideo = () => useContext(VideoContext);