import { useEffect, useRef } from "react"

export function useOutSiteClick(close,listenCapturing = true){

  const ref = useRef()
  useEffect(function(){
    function handleClick(e){
      if(ref.current && !ref.current.contains(e.target)){
        close()
      }
    }
   //true is for bable, cupture phase
    document.addEventListener('click',handleClick,listenCapturing)
    return () => document.removeEventListener('click',handleClick,listenCapturing)
  },[close])

  return ref
}