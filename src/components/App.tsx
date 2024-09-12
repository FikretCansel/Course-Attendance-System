'use client'
import React, { useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../Firebase";
import { useParams, useRouter } from 'next/navigation';

function App() {

    const [user,isLoading]= useAuthState(auth);
    const router = useRouter()
    const params = useParams()
    useEffect(() => {
        
        if(user){
            // router.push('/link-course/'+params.id)
        }
        else {
            // router.push('/')
        }
        
    }, [user, router])
    

  if(isLoading){return <h1>Yükleniyor...</h1>}
  return;
}

export default App