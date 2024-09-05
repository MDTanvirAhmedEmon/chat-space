import { Avatar } from "antd";
import Link from "next/link";

const MobileSingleUserItem = ({user, isSelected, onClick, setShow, show}) => {
    return (
        <>
            <Link onClick={() => {
                onClick
                setShow(!show)
            }} href={`/${user?._id}`}>
                <div className={` cursor-pointer shadow-lg px-2 rounded-md ${isSelected? 'bg-primary text-white shadow-2xl': 'bg-white text-black'}  flex gap-2 justify-between items-center py-2 mt-4`}>

                    <div className=" flex gap-2 items-center">
                        <Avatar className="w-14 h-14" src="https://imgcdn.stablediffusionweb.com/2024/5/2/81328692-c85f-4e08-9c01-f8f9f49fb291.jpg" />
                        <div>
                            <p className=" font-bold capitalize">{user?.name}</p>
                            <p className=" text-sm">Hy, What's Up!</p>
                        </div>

                    </div>
                    <p className=" mr-1">11:12 AM</p>
                </div>
            </Link>
        </>
    );
};

export default MobileSingleUserItem;