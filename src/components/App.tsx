"use client";
import { useEffect, useState } from "react";
import { auth } from "../Firebase";
import { usePathname, useRouter } from "next/navigation";
import { LOGIN, MYCOURSES, REGISTER } from "@/utils/page-urls";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    setIsLoading(true);
    console.log(pathname);
    auth.onAuthStateChanged((authUser) => {
      setIsLoading(false);
      if (authUser) {
        if(pathname === '/'){
          router.push(MYCOURSES);
        }
        if (pathname === "/login") {
          router.push(MYCOURSES);
        }
      } else {
        if(pathname === '/'+REGISTER){
        }
        else if(pathname === '/' || pathname === '/add-course') router.push(LOGIN);
      }
    });
  }, []);

  if (isLoading) {
    return;
  }
  return;
}

export default App;
