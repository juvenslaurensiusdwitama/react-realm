import Menu from '../../components/Menu'
import bgHome from '../../assets/bg-home.jpg'
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ConfigProvider, Flex, Progress } from 'antd';
import BadgesValidation from '../../components/BadgesValidation';
import ThropyValidation from '../../components/ThropyValidation';

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
            <div className='my-8 bg-slate-900/80 h-[620px] w-[600px] backdrop-blur-xs 
                rounded-[8px] text-white p-4 flex flex-col justify-between'
            >
                <div className='flex justify-between items-start'>
                    <div className='flex flex-col bg-slate-500/40 rounded-[8px] py-2 px-4'>
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
                        <div className='flex flex-col gap-1 bg-slate-500/40 px-1 py-1 rounded-[4px] my-1'>
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
                    <p className='bg-slate-500/40 px-1 rounded-[4px]'>{userDetail?.points} Points</p>
                </div>
                <div className='w-full flex justify-around'>
                    <p>char</p>
                    <p>char</p>
                </div>
                <div>tes</div>
            </div>
        </div>
    )
}

export default Home