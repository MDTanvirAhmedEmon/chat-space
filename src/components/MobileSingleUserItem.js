import { Avatar } from "antd";
import { format } from "date-fns";
import Link from "next/link";

const MobileSingleUserItem = ({user, isSelected, onClick, setShow, show}) => {
    const formattedTime = user?.time
        ? format(new Date(user.time), "hh:mm a")
        : "";
    return (
        <>
            <Link onClick={() => {
                onClick
                setShow(!show)
            }} href={`/${user?._id}`}>
                <div className={` cursor-pointer shadow-lg px-2 rounded-md ${isSelected? 'bg-primary text-white shadow-2xl': 'bg-white text-black'}  flex gap-2 justify-between items-center py-2 mt-4`}>

                    <div className=" flex gap-2 items-center">
                        <Avatar className="w-14 h-14" src="https://i.pinimg.com/236x/83/d0/2a/83d02a26c786c46d389b4bb8c5557495.jpg" />
                        <div>
                            <p className=" font-bold capitalize">{user?.name}</p>
                            <p className=" text-sm">{user?.lastMessage}</p>
                        </div>

                    </div>
                    <p className=" mr-1">{formattedTime}</p>
                </div>
            </Link>
        </>
    );
};

export default MobileSingleUserItem;