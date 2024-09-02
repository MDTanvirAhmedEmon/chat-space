import SideBar from "@/components/SideBar";



export default function Main({ children }) {
  return (

    <div className="container mx-auto">
      <div className="flex">
        <div className="bg-[#2424240a] shadow w-[20%] h-screen p-4">
          <SideBar />
        </div>
        <div className=" bg-[#24242404] w-[80%]">
          {children}
        </div>
      </div>
    </div>

  )
}
