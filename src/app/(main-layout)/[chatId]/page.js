"use client"
import { Avatar, ConfigProvider, Input, message } from "antd";
import io from 'socket.io-client';
import { IoIosSend } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";

const DynamicUserItem = ({ params }) => {
    const { chatId } = params;
    console.log(chatId)
    const user = JSON.parse(localStorage.getItem('user'))

    const [text, setText] = useState('');
    const [singleUser, setSingleUser] = useState(null);
    const [allReceivedMessage, setAllReceivedMessage] = useState([]);
    const [realTimeMessage, setRealTimeMessage] = useState([]);
    console.log('from socket', allReceivedMessage)
    // const myId = 11;
    const socket = io('https://chat-space-simple-server-production.up.railway.app');
    // const socket = useMemo(() =>io('http://localhost:5000'),[]);


    // const socket = useMemo(() => io('http://localhost:5000'), []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("SOCKET IS CONNECTED WITH ID", socket.id);
            socket.emit('register', user?._id);
        });

        socket.on(`receiverMessage:${user?._id}`, (newMessage) => {
            console.log(newMessage)
            setAllReceivedMessage((prevMessages) => [...prevMessages, newMessage]);
        });


        return () => {
            socket.disconnect();
        };
    }, [socket]);


    useEffect(() => {
        fetch(`https://chat-space-simple-server-production.up.railway.app/conversation/${user?._id}/${chatId}`)
            .then(res => res.json())
            .then(data => setAllReceivedMessage(data))
    }, [])

    useEffect(() => {
        fetch(`https://chat-space-simple-server-production.up.railway.app/single-user/${chatId}`)
            .then(res => res.json())
            .then(data => setSingleUser(data?.data))
    }, [])


    const sendMessage = () => {
        if (text !== '') {
            const myMessage = { senderId: user?._id, receiverId: chatId, text }
            console.log(myMessage)
            socket.emit('sendMessage', myMessage)
            setText('')
        }

    }

    return (
        <div className=' h-screen relative'>
            <div className=" h-16 md:h-[70px] border-b bg-[#24242404] flex items-center pl-3 gap-3">
                <Avatar size={50} className="w-16 h-16" src="https://imgcdn.stablediffusionweb.com/2024/5/2/81328692-c85f-4e08-9c01-f8f9f49fb291.jpg" />
                <div>
                    <p className=" font-bold capitalize">{singleUser?.name}</p>
                    <p className=" text-sm">Last Seen 1h</p>
                </div>
            </div>
            <div className=" pt-4 md:pt-4 pb-5 px-10  h-[83vh] md:h-[81vh] overflow-hidden overflow-y-scroll">


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

            <div className="absolute bottom-5 flex w-full justify-center md:mb-4">

                <input value={text} onChange={(e) => setText(e.target.value)} className=" border shadow-lg active:shadow-lg focus:shadow-lg active:ring-none px-4 rounded-xl w-[250px] md:w-[300px] lg:w-[500px] xl:w-[700px]" size="large" placeholder="Type Message Here..." />
                <IoIosSend onClick={sendMessage} className=" w-12 h-12 text-primary cursor-pointer" />
            </div>
        </div>
    );
};

export default DynamicUserItem;