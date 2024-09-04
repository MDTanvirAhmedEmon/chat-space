"use client"
import { ConfigProvider, Input, message } from "antd";
import io from 'socket.io-client';
import { IoIosSend } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";

const DynamicUserItem = ({ params }) => {
    const { chatId } = params;
    console.log(chatId)
    const user = JSON.parse(localStorage.getItem('user'))

    const [text, setText] = useState();
    const [allReceivedMessage, setAllReceivedMessage] = useState([]);
    console.log('from socket', allReceivedMessage)
    console.log(text)

    const myId = 11;
    const socket = io('http://localhost:5000');
    // const socket = useMemo(() =>io('http://localhost:5000'),[]);


    // const socket = useMemo(() => io('http://localhost:5000'), []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("SOCKET IS CONNECTED WITH ID", socket.id);
            socket.emit('register', user?._id);
        });

        socket.on('receiverMessage', (newMessage) => {
            console.log(newMessage)
            setAllReceivedMessage((prevMessages) => [...prevMessages, newMessage]);
        });


        // Clean up the socket connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, [socket]);





    const sendMessage = () => {
        const myMessage = { senderId: user?._id, receiverId: chatId, text }
        console.log(myMessage)
        socket.emit('sendMessage', myMessage)
    }

    return (
        <div className=' h-full relative'>
            <div className=" pt-10 px-10">


                <div className=" flex flex-col">

                    {
                        allReceivedMessage?.map((message, index) =>
                            <div key={index} className="mt-6 w-full">
                                <span className={` ${user?._id === message?.senderId ? 'bg-primary text-white' : 'bg-[#0000001a] text-black float-end'}  px-4 py-2 rounded-3xl`}>{message?.text}</span>

                            </div>)
                    }

                    {/* <div className=" mt-8">
                            <span className={` ${myId === 12 ? 'bg-primary text-white' : 'bg-[#0000001a] text-black float-end'}  px-4 py-2 rounded-3xl`}>What's Up Bro!!</span>
                        </div>  */}
                </div>

            </div>

            <div className=" absolute bottom-0 flex w-full justify-center mb-4">

                <input onChange={(e) => setText(e.target.value)} className=" border shadow-lg active:shadow-lg focus:shadow-lg active:ring-none px-4 rounded-xl w-[300px] lg:w-[500px] xl:w-[700px]" size="large" placeholder="Type Message Here..." />
                <IoIosSend onClick={sendMessage} className=" w-12 h-12 text-primary cursor-pointer" />
            </div>
        </div>
    );
};

export default DynamicUserItem;