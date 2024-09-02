import UserList from "@/components/UserList"



export default function Main({ children }) {
  return (

    <div className="container mx-auto">
      <div className="flex">
        <div className="bg-slate-100 w-[20%] h-screen p-4">
          <UserList />
        </div>
        <div className="bg-green-300 w-[80%]">
          {children}
        </div>
      </div>
    </div>

  )
}
