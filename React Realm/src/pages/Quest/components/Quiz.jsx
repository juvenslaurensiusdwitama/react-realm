import { useEffect, useState } from 'react';
import bgQuest from '../../../assets/bg-quest.png'
import BadgesValidation from '../../../components/BadgesValidation';
import arrow from '../../../assets/arrow-pixel.png'
import Menu from '../../../components/Menu';
import AvatarValidation from '../../../components/AvatarValidation';
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';

const Quiz = ({ data }) => {
    const id = sessionStorage.getItem('id')
    const db = getFirestore();
    const [userDetail, setUserDetail] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const [contentIndex, setContentIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()

    const getUserById = async () => {
        try {
            setIsLoading(true)
            const q = doc(collection(db, "users"), id);
            const userData = await getDoc(q);
            if (userData.exists()) setUserDetail(userData.data())
        } catch (err) {
            console.error(err)
        }
        setIsLoading(false)
    }

    const handleFinish = async() =>{
        try{
            setIsSubmitLoading(true)
        }catch(err){
            console.error(err)
        }finally{
            setIsSubmitLoading(false)
            setIsModalOpen(false)
            navigate('')
        }
    }

    useEffect(() => {
        getUserById()
    }, [])

    // console.log(data.contents[contentIndex].correctAnswer)
    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgQuest})` }}
        >
            <Menu />
            <div className='flex flex-col my-20 py-5 px-6 rounded-[16px] text-[#F6F8D5]
                border-[4px] border-[#F6F8D5] border-solid w-[650px] bg-[#205781]
                gap-6'
            >
                <div className='w-full flex justify-between text-[14px] font-semibold'>
                    <h1>{data.title}</h1>
                    <div className='flex gap-1'>
                        <p>Reward:</p>
                        <p className='text-[14px] text-[#efff94]'>{data.exp} exp</p>
                        <p>|</p>
                        <BadgesValidation data={data.badges} />
                    </div>
                </div>
                <h1 className='text-[28px] font-semibold w-full text-center'>{data.contents[contentIndex].question}</h1>
                <div className='flex justify-between items-center'>
                    <AvatarValidation data={userDetail?.activeAvatar} className={'w-[230px] h-fit'} />
                    <div className='flex flex-col gap-4 w-full'>
                        {data.contents[contentIndex].answer.map((item, i) =>
                            <p className='bg-[#4F959D] text-[18px] p-2 rounded-[8px] h-fit
                                border-[2px] border-[#F6F8D5] border-solid font-semibold 
                                hover:bg-[#74b6a0] cursor-pointer transition duration-200'
                            >
                                {i === 0 ? 'A. '
                                    : i === 1 ? 'B. '
                                        : i === 2 ? 'C. '
                                            : i === 3 ? 'D. '
                                                : null
                                }{item}
                            </p>
                        )}
                    </div>
                </div>
                <div className='flex justify-end items-center gap-4 mt-2'>
                    <div className='flex gap-1'>
                        <img src={arrow}
                            className={`cursor-pointer rotate-180 h-[24px] transition-all ${contentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-125'}`}
                            onClick={() => contentIndex > 0 && setContentIndex(contentIndex - 1)}
                        />
                        <img src={arrow}
                            className={`cursor-pointer h-[24px] transition-all ${contentIndex === data.contents.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-125'}`}
                            onClick={() => contentIndex < data.contents.length - 1 && setContentIndex(contentIndex + 1)} />
                    </div>
                    {contentIndex === data.contents.length - 1 &&
                    <button
                        className='bg-[#4F959D] py-1 px-4 rounded-[10px] cursor-pointer transition duration-150
                                    border-[2px] border-solid text-[#F6F8D5] text-[14px] hover:opacity-[0.8]
                                    font-semibold'
                        onClick={() => setIsModalOpen(true)}
                    >
                        Finish
                    </button>}
                </div>
            </div>
            <Modal
                title={data.title}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                centered
                width={450}
                footer={
                    isSubmitLoading ?
                        <Button type="primary" loading iconPosition={'end'}>
                            Loading
                        </Button>
                        :
                        <Button type='primary' onClick={() => handleFinish()}>
                            Claim Reward
                        </Button>
                }
            >
                <p> Quest Completed ✨</p>
                <div className='flex gap-1 items-center'>
                    <p>Here's Your Reward: {data.exp} exp</p>
                    <p>|</p>
                    <BadgesValidation data={data.badges} />
                    <p>{data.badges}</p>
                </div>
            </Modal>
        </div>
    )
}

export default Quiz