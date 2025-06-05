import { Button, Form, Input } from 'antd'
import bgAuth from '../../assets/bg-auth.jpg'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firestore'
import { useEffect, useState } from 'react';

const Register = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async (values) => {
        try {
            setIsLoading(true)
            await addDoc(collection(db, "users"), {
                "username": values.username,
                "password": values.password,
                "points": 0,
                "exp": 0,
                "badges": [""],
                "thropy": [""],
                "avatars": [""],
            });
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            navigate('/login')
        }
    }

    useEffect(() => {

    }, [])
    return (
        <div
            className='h-screen bg-cover bg-center flex flex-col justify-center items-center'
            style={{ backgroundImage: `url(${bgAuth})` }}
        >
            <div className='w-[500px] text-[#ffff]'>
                <h1 className='text-[36px] font-semibold bg-slate-200/60 
                backdrop-blur-xs rounded-t-[4px] w-full text-center py-1'>
                    React Realm
                </h1>
                <div className='bg-slate-300/60 backdrop-blur-xs rounded-b-[4px] py-4 px-6 
                    w-full flex flex-col gap-2'
                >
                    <h1 className='text-[26px] font-semibold'>Register</h1>
                    <Form layout='vertical' className="custom-form-gap" onFinish={handleRegister}>
                        <Form.Item label={<span style={{ color: "#ffff" }}>Username</span>} name="username"
                            rules={[
                                { required: true, message: 'Please input your username!' },
                                { min: 3, message: 'Username must be at least 3 characters' },
                                { max: 20, message: 'Username must be at most 20 characters' },
                                {
                                    pattern: /^[a-zA-Z0-9]+$/,
                                    message: 'Username can only contain letters and numbers (no special characters)',
                                },
                                {
                                    validator: (_, value) => {
                                        if (!value) return Promise.resolve(); // required handles empty

                                        const hasLetter = /[a-zA-Z]/.test(value);
                                        const hasNumber = /[0-9]/.test(value);

                                        if (!hasLetter) {
                                            return Promise.reject('Username must contain at least one letter');
                                        }
                                        if (!hasNumber) {
                                            return Promise.reject('Username must contain at least one number');
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}
                        >
                            <Input placeholder="Username" required />
                        </Form.Item>
                        <Form.Item label={<span style={{ color: "#ffff" }}>Password</span>} name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 3, message: 'Password must be at least 3 characters' },
                                { max: 20, message: 'Password must be at most 20 characters' },
                                {
                                    pattern: /^[a-zA-Z0-9]+$/,
                                    message: 'Password can only contain letters and numbers (no special characters)',
                                },
                                {
                                    validator: (_, value) => {
                                        if (!value) return Promise.resolve(); // required rule will catch empty

                                        const hasLetter = /[a-zA-Z]/.test(value);
                                        const hasNumber = /[0-9]/.test(value);

                                        if (!hasLetter) {
                                            return Promise.reject('Password must contain at least one letter');
                                        }
                                        if (!hasNumber) {
                                            return Promise.reject('Password must contain at least one number');
                                        }
                                        return Promise.resolve();
                                    }
                                }
                            ]}>
                            <Input.Password placeholder="Password" required />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                block type='primary' htmlType='submit'
                                style={{
                                    marginTop: "16px", display: "flex",
                                    gap: "18px", opacity: isLoading && 0.6
                                }}
                                disabled={isLoading}
                            >
                                Register
                                {isLoading && <span className="loader-sm"></span>}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register