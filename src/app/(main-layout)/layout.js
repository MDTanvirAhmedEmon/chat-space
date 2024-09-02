import SideBar from "@/components/SideBar";



export default function Main({ children }) {
  return (

    <div className="container mx-auto">
      <div className="flex">
        <div className="bg-[#2424240a] shadow w-[40%] lg:w-[35%] xl:w-[25%] 2xl:w-[20%] h-screen p-4">
          <SideBar />
        </div>
        <div className=" bg-[#24242404] w-[60%] lg:w-[65%] xl:w-[75%] 2xl:w-[80%]">
          {children}
        </div>
      </div>
    </div>

  )
}
