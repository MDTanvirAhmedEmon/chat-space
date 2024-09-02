import { ConfigProvider, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import SingleUserItem from "./SingleUserItem";


const UserList = () => {
    return (
            <div className="">
                <div>
                    <p className=" text-3xl font-bold mb-4">Chat Space</p>
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
                    <SingleUserItem></SingleUserItem>
                    <SingleUserItem></SingleUserItem>
                    <SingleUserItem></SingleUserItem>
                    <SingleUserItem></SingleUserItem>
                    <SingleUserItem></SingleUserItem>
                    <SingleUserItem></SingleUserItem>
                    <SingleUserItem></SingleUserItem>
                </div>
            </div>

    );
};

export default UserList;