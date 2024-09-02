import { Avatar } from "antd";
import Link from "next/link";

const SingleUserItem = () => {
    return (
        <>
            <Link href={`/7`}>
                <div className=" cursor-pointer shadow-lg px-2 rounded-md bg-white flex gap-2 justify-between items-center py-2 mt-4">

                    <div className=" flex gap-2 items-center">
                        <Avatar className="w-12 h-12" src="https://imgcdn.stablediffusionweb.com/2024/5/2/81328692-c85f-4e08-9c01-f8f9f49fb291.jpg" />
                        <div>
                            <p className=" font-bold">TA Emon</p>
                            <p className=" text-sm">Hy, What's Up!</p>
                        </div>

                    </div>
                    <p className=" mr-1">11:12 AM</p>
                </div>
            </Link>
        </>
    );
};

export default SingleUserItem;