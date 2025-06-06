import Menu from '../../components/Menu'
import bgHome from '../../assets/bg-home.jpg'
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
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
            <div className='my-8 bg-slate-900/80 backdrop-blur-xs 
                text-white p-6 flex flex-col gap-4'
            >
                <div className='flex justify-between items-start'>
                    <div className='min-w-[215px] flex flex-col bg-slate-500/40 py-2 px-4'>
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
                            <Flex vertical gap="small" style={{ width: 180 }}>
                                <Progress percent={30} size="small" status="active" />
                            </Flex>
                        </ConfigProvider>
                        <div className='flex flex-col gap-1 bg-slate-500/40 px-1 py-1 my-1'>
                            <div className='flex items-center gap-1'>
                                {userDetail?.badges.map((badge) =>
                                    <BadgesValidation data={badge} />
                                )}
                            </div>
                            <div className='flex items-center gap-3'>
                                {userDetail?.thropy.map((thropy) =>
                                    <ThropyValidation data={thropy} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-end gap-2'>
                        <p className='bg-slate-500/40 px-1 rounded-[4px] font-semibold'>{userDetail?.points} Points</p>
                        <div className='flex flex-col items-end'>
                            <p className='font-semibold text-[14px]'>Acquired Title</p>
                            {userDetail?.badges.map((badge)=>
                                <p className='text-[12px] underline underline-offset-2'>{badge}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-between'>
                    <div className='grid grid-cols-3 gap-2 min-w-[215px]'>
                        {userDetail?.avatars.map((avatar)=>
                            <div className='bg-slate-500/40 h-[72px]'>
                                <AvatarValidation className='w-[70px]' data={avatar}/>
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <AvatarValidation className='w-[200px]' data={userDetail?.activeAvatar}/>
                        <button 
                            className='bg-slate-500/40 px-6 py-1 font-semibold 
                            transition duration-100 cursor-pointer hover:opacity-[0.6]'
                        >
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home