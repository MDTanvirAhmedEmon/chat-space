"use client";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Main({ children }) {
  const router = useRouter();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user]);

  return (

    <div className="container mx-auto">
      <div className="flex">
        <div className=" sticky top-0 bottom-0 bg-[#2424240a] shadow w-[40%] lg:w-[35%] xl:w-[25%] 2xl:w-[20%] h-[100vh] p-4">
          <SideBar />
        </div>
        <div className=" bg-[#24242404] w-[60%] lg:w-[65%] xl:w-[75%] 2xl:w-[80%]">
          {children}
        </div>
      </div>
    </div>

  )
}
