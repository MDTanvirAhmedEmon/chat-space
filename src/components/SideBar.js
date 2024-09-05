"use client";
import { ConfigProvider, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import SingleUserItem from "./SingleUserItem";
import { useEffect, useState } from "react";


const SideBar = () => {
    const [users, setUsers] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    console.log(users)

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user && user._id) {
            fetch(`http://localhost:5000/users/${user._id}`)
                .then(res => res.json())
                .then(data => setUsers(data?.data))
                .catch(error => console.error('Error fetching users:', error));
        }
    }, []);

    return (
        <div className="">
            <div>
                <p className=" text-3xl font-bold mb-4 capitalize">{user?.name}</p>
                <ConfigProvider
                    theme={{
                        components: {
                            Input: {
                                activeBorderColor: "transparent",
                                hoverBorderColor: "transparent",
                                colorBorder: "transparent",
                                activeShadow: "none",
                            },
                        },
                    }}
                >
                    <Input className=" shadow-lg active:shadow-lg focus:shadow-lg" size="large" placeholder="Search" prefix={<CiSearch className=" w-6 h-6 text-primary" />} />
                </ConfigProvider>
            </div>
            {/* user Item */}
            <div className=" mt-8">
                {
                    users?.map(user => <SingleUserItem
                        key={user._id}
                        isSelected={selectedUserId === user._id}
                        onClick={() => setSelectedUserId(user._id)}
                        user={user}
                    ></SingleUserItem>)
                }

            </div>
            <button onClick={() => {
                localStorage.removeItem('user');
                window.location.reload();
            }} className=" text-white bg-primary px-8 py-2 rounded-2xl shadow-2xl mt-14 w-full">Log Out</button>
        </div>

    );
};

export default SideBar;