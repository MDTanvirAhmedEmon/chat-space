"use client";
import { Form, Input, message } from "antd";
import { useRouter } from "next/navigation";

const Registration = () => {
    const router = useRouter();
    const onFinish = async (values) => {
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
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
                message.success("Log In Successfull");
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
            <div className="w-[600px] bg-primary px-6 py-10 rounded-2xl shadow-2xl">
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
                        label={<p className="text-white">Email</p>}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
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
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                        className="text-center"
                    >
                        <button className="bg-white px-6 py-2 rounded-2xl" htmlType="submit">
                            Log In
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Registration;
