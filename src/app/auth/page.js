"use client";
import { Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Registration = () => {
    const router = useRouter();
    const onFinish = async (values) => {
        try {
            const response = await fetch('https://chat-space-simple-server.vercel.app/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const result = await response.json();


            if (result.success) {
                console.log('Success:', result);
                localStorage.setItem('user',JSON.stringify(result?.data));
                router.push(`/`)
                message.success("Register Success");
            } else {
                console.error('Failed:', result);
                message.error(result?.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }



    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className=" mx-2 px-4 w-[300px] md:w-[600px] bg-primary md:px-6 py-10 rounded-2xl shadow-2xl">
                <Form
                    className="w-full"
                    layout="vertical"
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label={<p className="text-white">Name</p>}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input placeholder="Your Name" />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-white">Email</p>}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input placeholder="Your Email" />
                    </Form.Item>

                    <Form.Item
                        label={<p className="text-white">Password</p>}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Enter Password" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                        className="text-center"
                    >
                        <button className="bg-white px-6 py-2 rounded-2xl" htmlType="submit">
                            Register
                        </button>
                    </Form.Item>
                    <div className="flex gap-2">
                        <p className=" text-[#d4d4d4]">Already Have An Account?</p> <Link href={`/auth/login`}><p className=" text-[#ffffff]  mr-2">Log In</p></Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Registration;
