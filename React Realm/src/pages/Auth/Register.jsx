import { Button, Form, Input } from 'antd'
import bgAuth from '../../assets/bg-auth.jpg'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const handleRegister = () =>{
        navigate('/login')
    }
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
                    <Form layout='vertical' className="custom-form-gap">
                        <Form.Item label={<span style={{ color: "#ffff" }}>Username</span>} name="username">
                            <Input placeholder="Username" />
                        </Form.Item>
                        <Form.Item label={<span style={{ color: "#ffff" }}>Password</span>} name="password">
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                block type='primary' htmlType='submit' 
                                style={{ marginTop: "16px" }}
                                onClick={() => handleRegister()}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register