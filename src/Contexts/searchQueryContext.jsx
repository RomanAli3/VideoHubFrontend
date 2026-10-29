import { createContext,useContext,useState } from "react";
export const SearchQueryContext=createContext()


export const SearchQueryProvider=({children})=>{
    const [videoSearch,setVideoSearch]=useState("")
    return(
        <SearchQueryContext.Provider value={{videoSearch,setVideoSearch}}>
            {children}
        </SearchQueryContext.Provider>
    )
}

export const useSearchQuery=()=>useContext(SearchQueryContext)