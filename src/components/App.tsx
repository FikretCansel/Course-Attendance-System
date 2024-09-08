'use client'
import React, { useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../Firebase";
import { useRouter } from 'next/navigation';

function App() {

    const [user,isLoading]= useAuthState(auth);
    const router = useRouter()
    useEffect(() => {
        
        if(user){
            router.push('/link-course')
        }
        else {
            router.push('/')
        }
        
    }, [user, router])
    

  if(isLoading){return <h1>Yükleniyor...</h1>}
  return;
}

export default App