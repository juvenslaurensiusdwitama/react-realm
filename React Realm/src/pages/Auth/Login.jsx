import { Button, Form, Input, Modal } from 'antd'
import bgAuth from '../../assets/bg-auth.jpg'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firestore'
import { useEffect, useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const navigate = useNavigate()

    const getUserData = async () => {
        try {
            setIsLoading(true)
            const querySnapshot = await getDocs(collection(db, "users"))
            const datas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setUserData(datas)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleFinish = () => {
        let isMatchFound = false;
        userData.forEach((data) => {
            if (username === data.username && password === data.password) {
                sessionStorage.setItem('isLogin', true)
                sessionStorage.setItem('id', data.id)
                isMatchFound = true;
                setIsLoginSuccess(true)
            }
        })
        userData.forEach(() => {
            if (!isMatchFound) {
                setIsLoginFailed(true)
            }
        })
    }

    useEffect(() => {
        getUserData()
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
                    {isLoading ?
                        <div className='w-full flex justify-center'>
                            <span className="loader mt-6 mb-7"></span>
                        </div>
                        :
                        <>
                            <h1 className='text-[26px] font-semibold'>Login</h1>
                            <Form layout='vertical' className="custom-form-gap" onFinish={handleFinish}>
                                <Form.Item label={<span style={{ color: "#ffff" }}>Username</span>} name="username">
                                    <Input placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
                                </Form.Item>
                                <Form.Item label={<span style={{ color: "#ffff" }}>Password</span>} name="password">
                                    <Input.Password placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                                </Form.Item>
                                <p className='text-white flex gap-2'>
                                    <span>New here?</span>
                                    <span
                                        className='underline cursor-pointer'
                                        onClick={() => navigate('/register')}
                                    >
                                        Create an account
                                    </span>
                                </p>
                                <Form.Item>
                                    <Button block type='primary' htmlType='submit' style={{ marginTop: "16px" }}>Login</Button>
                                </Form.Item>
                            </Form>
                        </>
                    }
                </div>
            </div>
            <Modal
                title={<p> Login Success ✅</p>}
                open={isLoginSuccess}
                onOk={() => {
                    setIsLoginSuccess(false)
                    navigate('/')
                }}
                onCancel={() => setIsLoginSuccess(false)}
                centered
                width={450}
                footer={[
                    <Button key="ok" type="primary" onClick={() => {
                        setIsLoginSuccess(false)
                        navigate('/')
                    }}>
                        OK
                    </Button>
                ]}
            >
                <p>Let's embark on an adventure to React Realm!</p>
            </Modal>
            <Modal
                title={<p> Login Failed ❌</p>}
                open={isLoginFailed}
                onOk={() => setIsLoginFailed(false)}
                onCancel={() => setIsLoginFailed(false)}
                centered
                width={450}
                footer={[
                    <Button key="ok" type="primary" onClick={() => setIsLoginFailed(false)}>
                        OK
                    </Button>
                ]}
            >
                <p>Incorrect username or password!</p>
            </Modal>
        </div>
    )
}

export default Login