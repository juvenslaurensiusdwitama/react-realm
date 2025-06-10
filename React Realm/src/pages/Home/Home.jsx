import Menu from '../../components/Menu'
import bgHome from '../../assets/bg-home.jpg'
import { getFirestore, doc, getDoc, collection, setDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ConfigProvider, Flex, Progress } from 'antd';
import BadgesValidation from '../../components/BadgesValidation';
import ThropyValidation from '../../components/ThropyValidation';
import AvatarValidation from '../../components/AvatarValidation';

const Home = () => {
    const id = sessionStorage.getItem('id')
    const db = getFirestore();
    const [userDetail, setUserDetail] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState("archer")

    const getUserById = async () => {
        try {
            setIsLoading(true)
            const q = doc(collection(db, "users"), id);
            const userData = await getDoc(q);
            if (userData.exists()) setUserDetail(userData.data())
            console.log(userData.data())
        } catch (err) {
            console.error(err)
        }
        setIsLoading(false)
    }

    const handleSelect = async () => {
        try {
            setIsLoading(true)
            await setDoc(doc(db, "users", id), {
                ...userDetail,
                activeAvatar: selectedAvatar,
            })
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            getUserById()
        }
    }

    useEffect(() => {
        getUserById()
    }, [])
    console.log(userDetail)
    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgHome})` }}
        >
            <Menu />
            <div className='my-20 bg-slate-900/80 backdrop-blur-xs 
                text-white p-6 flex flex-col gap-2 min-h-[400px] min-w-[450px]'
            >
                {isLoading ?
                    <div className='h-full w-full flex items-center justify-center'>
                        <span className="loader"></span>
                    </div>
                    :
                    <>
                        <div className='flex justify-between items-start'>
                            <div className='min-w-[376px] flex flex-col bg-slate-500/40 py-2 px-4'>
                                <h1 className='text-[16px] font-semibold'>{userDetail?.username}</h1>
                                <div className='flex justify-between text-[14px]'>
                                    <p>Level 10</p>
                                    <p>{userDetail?.exp} exp / 344 exp</p>
                                </div>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Progress: {
                                                colorText: '#ffff'
                                            },
                                        },
                                    }}
                                >
                                    <Flex vertical gap="small" style={{ width: '100%' }}>
                                        <Progress percent={30} size="small" status="active" />
                                    </Flex>
                                </ConfigProvider>
                                <div className='flex flex-col gap-1 bg-slate-500/40 px-1 py-1 my-1'>
                                    <div className='flex items-center gap-1'>
                                        {userDetail?.badges.length ?
                                            userDetail?.badges.map((badge) =>
                                                <BadgesValidation data={badge} />
                                            ) : <p className={`text-[12px] w-full text-center`}>No badges</p>}
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        {userDetail?.thropy.length ?
                                            userDetail?.thropy.map((thropy) =>
                                                <ThropyValidation data={thropy} />
                                            ) : <p className={`text-[12px] w-full text-center`}>No thropy</p>}
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <p className='px-1 text-end text-[14px]'>{userDetail?.points} Points</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-end gap-2'>
                                <div className='flex flex-col items-end'>
                                    <p className='font-semibold text-[14px]'>Acquired Title</p>
                                    {userDetail?.badges.length ?
                                        userDetail?.badges.map((badge) =>
                                            <p className='text-[12px] underline underline-offset-2'>{badge === "Novice Coder" ? "Novice Coder"
                                                : badge === "React Enthusiast" ? "React Enthusiast"
                                                    : badge === "JSX Debugger" ? "JSX Debugger"
                                                        : badge === "JSX Architect" ? "JSX Architect"
                                                            : badge === "Component Master" ? "Component Master"
                                                                : badge === "Component Expert" ? "Component Expert"
                                                                    : null}</p>
                                        ) : <p className='text-[12px] w-full'>No acquired title</p>}
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-between'>
                            <div className='grid grid-cols-3 gap-2 items-start'>
                                {userDetail?.avatars.map((avatar) =>
                                    <>
                                        {avatar === userDetail?.activeAvatar ? 
                                            <div className='bg-slate-400/50'>
                                                <AvatarValidation className='w-[120px] p-1' data={avatar} />
                                            </div>
                                            :
                                            <div className='bg-slate-500/40 cursor-pointer hover:opacity-[0.6]'
                                                onClick={() => setSelectedAvatar(avatar)}
                                            >
                                                <AvatarValidation className='w-[120px] p-1' data={avatar} />
                                            </div>
                                        }
                                    </>
                                )}
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <AvatarValidation className='w-[210px]' data={selectedAvatar} />
                                <button
                                    className='bg-slate-500/40 px-6 py-1 font-semibold 
                                    transition duration-100 cursor-pointer hover:opacity-[0.6]'
                                    onClick={() => handleSelect()}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    )
}

export default Home