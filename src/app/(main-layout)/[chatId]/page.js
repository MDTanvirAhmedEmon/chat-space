
import { ConfigProvider, Input } from "antd";

import { IoIosSend } from "react-icons/io";

const DynamicUserItem = ({ params }) => {
    const { chatId } = params;
    const myId = 11;
    return (
        <div className=' h-full relative'>
            <div className=" pt-10 px-10">

                {
                    <div>
                        <div className="">
                            <span className={` ${myId !== 11 ? 'bg-primary text-white float-end' : 'bg-[#0000001a] text-black'}  px-4 py-2 rounded-3xl`}>Hello</span>

                        </div>
                        <div className=" mt-8">
                            <span className={` ${myId !== 12 ? 'bg-primary text-white float-end' : 'bg-[#0000001a] text-black'}  px-4 py-2 rounded-3xl`}>What's Up Bro!!</span>
                        </div>
                    </div>
                }
            </div>

            <div className=" absolute bottom-0 flex w-full justify-center mb-4">

                <input className=" border shadow-lg active:shadow-lg focus:shadow-lg active:ring-none px-4 rounded-xl w-[700px]" size="large" placeholder="Type Message Here..." />
                <IoIosSend className=" w-12 h-12 text-primary cursor-pointer" />
            </div>
        </div>
    );
};

export default DynamicUserItem;