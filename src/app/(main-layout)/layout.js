"use client";

import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Main({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser);

      if (!storedUser) {
        router.push('/auth/login');
      }
    }
  }, [router]);
  // const [show, setShow] = useState(true);


  return (

    <div className=" container mx-auto">
      <div className={`md:flex`}>
        {/* desktop */}
        <div className=" hidden md:block sticky top-0 bottom-0 bg-[#2424240a] shadow w-[40%] lg:w-[35%] xl:w-[25%] 2xl:w-[20%] h-[100vh] p-4">
          <SideBar />
        </div>
        <div className=" hidden md:block bg-[#24242404] w-[60%] lg:w-[65%] xl:w-[75%] 2xl:w-[80%]">
          {children}
        </div>
        <div className="block md:hidden">
          {children}
        </div>

        {/* Mobile */}
        {/* <div className={` ${show ? ' translate-y-[0px]' : 'translate-y-[-1400px] overflow-hidden'} block md:hidden sticky top-0 right-0 left-0 bottom-0 bg-[#2424240a] shadow w-full h-[100vh] p-4`}>
          <MobileSideBar setShow={setShow} show={show} />
        </div>
        <div className={`${show ? ' translate-y-[-1400px] overflow-hidden' : 'translate-y-[0px]'} block md:hidden bg-[#24242404] w-full`}>
          {children}
        </div> */}


      </div>
    </div>

  )
}
