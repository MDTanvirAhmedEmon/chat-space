"use client";
import { Avatar } from "antd";
import io from 'socket.io-client';
import { IoIosSend } from "react-icons/io";
import { useEffect, useState } from "react";

const DynamicUserItem = ({ params }) => {
    const { chatId } = params;
    const [user, setUser] = useState(null);
    const [text, setText] = useState('');
    const [singleUser, setSingleUser] = useState(null);
    const [allReceivedMessage, setAllReceivedMessage] = useState([]);
    const [socket, setSocket] = useState(null);

    console.log('User:', user);
    console.log('ChatId:', chatId);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser)); 
            }
        }
    }, []);


    useEffect(() => {
        if (user && user._id) {
            const newSocket = io('http://localhost:5000');
            setSocket(newSocket);

            newSocket.on("connect", () => {
                console.log("SOCKET CONNECTED WITH ID", newSocket.id);
                newSocket.emit('register', user._id);
            });

            newSocket.on(`receiverMessage:${user._id}`, (newMessage) => {
                setAllReceivedMessage((prevMessages) => [...prevMessages, newMessage]);
            });

            return () => {
                newSocket.disconnect();
            };
        }
    }, [user]);

    // Fetch conversation
    useEffect(() => {
        if (user && user._id) {
            fetch(`http://localhost:5000/conversation/${user._id}/${chatId}`)
                .then(res => res.json())
                .then(data => setAllReceivedMessage(data))
                .catch(err => console.error('Error fetching conversation:', err));
        }
    }, [user, chatId]);

    // Fetch the single user data
    useEffect(() => {
        fetch(`http://localhost:5000/single-user/${chatId}`)
            .then(res => res.json())
            .then(data => setSingleUser(data?.data))
            .catch(err => console.error('Error fetching user:', err));
    }, [chatId]);

    // Send message
    const sendMessage = () => {
        if (text !== '' && socket) {
            const myMessage = { senderId: user?._id, receiverId: chatId, text };
            socket.emit('sendMessage', myMessage);
            setText('');
        }
    };

    return (
        <div className='h-screen relative'>
            <div className="h-16 md:h-[70px] border-b bg-[#24242404] flex items-center pl-3 gap-3">
                <Avatar size={50} className="w-16 h-16" src="https://i.pinimg.com/236x/83/d0/2a/83d02a26c786c46d389b4bb8c5557495.jpg" />
                <div>
                    <p className="font-bold capitalize">{singleUser?.name}</p>
                    <p className="text-sm">Last Seen 1h</p>
                </div>
            </div>
            <div className="pt-4 md:pt-4 pb-5 px-10 h-[83vh] md:h-[81vh] overflow-hidden overflow-y-scroll">
                <div className="flex flex-col">
                    {allReceivedMessage?.map((message, index) => (
                        <div key={index} className="mt-6 w-full">
                            <span className={`${user?._id === message?.senderId ? 'bg-primary text-white' : 'bg-[#0000001a] text-black float-end'} px-4 py-2 rounded-3xl`}>
                                {message?.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-5 flex w-full justify-center md:mb-4">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border shadow-lg active:shadow-lg focus:shadow-lg px-4 rounded-xl w-[250px] md:w-[300px] lg:w-[500px] xl:w-[700px]"
                    placeholder="Type Message Here..."
                />
                <IoIosSend onClick={sendMessage} className="w-12 h-12 text-primary cursor-pointer" />
            </div>
        </div>
    );
};

export default DynamicUserItem;
