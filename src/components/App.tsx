'use client'
import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../Firebase";
import { useParams, usePathname, useRouter } from 'next/navigation';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter()
    useEffect(() => {
        setIsLoading(true)
        console.log(pathname)
        auth.onAuthStateChanged(authUser=>{
            setIsLoading(false)
            if(authUser){
                router.push(pathname)
                if(pathname === '/login'){
                    router.push('courses')
                }
            }
            else{
                router.push('/login')
            }
          })
        
    }, [])
    

  if(isLoading){return <h1>Yükleniyor...</h1>}
  return;
}

export default App