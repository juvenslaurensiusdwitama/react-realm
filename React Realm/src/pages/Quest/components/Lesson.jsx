import Menu from '../../../components/Menu';
import bgQuest from '../../../assets/bg-quest.png'
import gandalf from '../../../assets/gandalf.png'
import arrow from '../../../assets/arrow-pixel.png'
import BadgesValidation from '../../../components/BadgesValidation';
import reactAnimated from '../../../assets/reactAnimated.gif'
import virtualDOM from '../../../assets/virtualDOM.jpg'
import propsDrill from '../../../assets/propsDrill.jpg'
import jsx1 from '../../../assets/jsx1.jpg'
import jsx2 from '../../../assets/jsx2.jpg'
import jsx3 from '../../../assets/jsx3.jpg'
import jsx4 from '../../../assets/jsx4.jpg'
import components1 from '../../../assets/components1.jpg'
import components2 from '../../../assets/components2.png'
import components3 from '../../../assets/components3.png'
import components4 from '../../../assets/components4.jpg'
import ImageValidation from '../../../components/ImageValidation';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { getDoc, doc, setDoc, collection } from "firebase/firestore";
import { db } from '../../../config/firestore';
import { useNavigate } from 'react-router-dom';


const Lesson = ({ data }) => {
    const id = sessionStorage.getItem('id')
    const [contentIndex, setContentIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userDetail, setUserDetail] = useState()
    const [isLoading, setIsLoading] = useState(false)
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

    const handleFinish = async () => {
        try {
            setIsLoading(true)
            const newBadges = userDetail?.badges.includes(data.badges) ? userDetail?.badges : [...userDetail?.badges, data.badges]
            const argument1 = data.title === 'The Foundation of React (Lesson)'
            const argument2 = data.title === 'The Foundation of React (Quiz)'
            const argument3 = data.title === 'JSX (Lesson)'
            const argument4 = data.title === 'JSX (Quiz)'
            const argument5 = data.title === 'All About Components (Lesson)'
            const nextQuest = argument1 ? 'The Foundation of React (Quiz)' : argument2 ? 'JSX (Lesson)' : argument3 ? 'JSX (Quiz)' : argument4 ? 'All About Components (Lesson)' : argument5 ? 'All About Components (Quiz)' : null
            const newQuest = userDetail?.unlockedQuest.includes(nextQuest) ? userDetail?.unlockedQuest : [...userDetail?.unlockedQuest, nextQuest]
            await setDoc(doc(db, "users", id), {
                ...userDetail,
                badges: newBadges,
                exp: userDetail.exp + data.exp,
                unlockedQuest: newQuest,
            })
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
            setIsModalOpen(false)
            navigate('/quest')
        }
    }

    useEffect(() => {
        getUserById()
    }, [])
    console.log(data.imgContents)
    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgQuest})` }}
        >
            <Menu />
            <div className='flex flex-col my-8 rounded-[16px] border-[4px] border-[#F6F8D5] 
                border-solid w-[750px]'
            >
                <div className='bg-[#205781] min-h-[200px] rounded-t-[12px] py-3 px-4'>
                    <div className='flex justify-between text-[14px] text-[#F6F8D5] font-semibold w-full'>
                        <h1>{data.title}</h1>
                        <div className='flex gap-1'>
                            <p>Reward:</p>
                            <p className='text-[14px] text-[#efff94]'>{data.exp} exp</p>
                            <p>|</p>
                            <BadgesValidation data={data.badges} />
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center h-full pb-4'>
                        <ImageValidation src={data.imgContents[contentIndex] === "reactAnimated" ? reactAnimated : null} className='w-[250px]'/>
                        <ImageValidation src={data.imgContents[contentIndex] === "virtualDOM" ? virtualDOM : null} />
                        <ImageValidation src={data.imgContents[contentIndex] === "propsDrill" ? propsDrill : null} className=''/>
                        <ImageValidation src={data.imgContents[contentIndex] === "jsx1" ? jsx1 : null} className=''/>
                        <ImageValidation src={data.imgContents[contentIndex] === "jsx2" ? jsx2 : null} className=''/>
                        <ImageValidation src={data.imgContents[contentIndex] === "jsx3" ? jsx3 : null} className=''/>
                        <ImageValidation src={data.imgContents[contentIndex] === "jsx4" ? jsx4 : null} className=''/>
                        <ImageValidation src={data.imgContents[contentIndex] === "components1" ? components1 : null} className=''/>
                        <ImageValidation src={data.imgContents[contentIndex] === "components2" ? components2 : null} className=''/>
                        <ImageValidation src={data.imgContents[contentIndex] === "components3" ? components3 : null} className=''/>
                        <ImageValidation src={data.imgContents[contentIndex] === "components4" ? components4 : null} className=''/>
                    </div>
                </div>
                <div className='flex bg-[#4F959D] 
                min-h-[200px] rounded-b-[12px] py-3 pr-[80px] items-center'>
                    <img src={gandalf} alt="" className='h-[180px]' />
                    <div className='flex flex-col gap-3 text-[#efff94] font-semibold'>
                        <p>{data.contents[contentIndex]}</p>
                        <div className='flex justify-end items-center gap-2'>
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
                                    className='bg-[#205781] py-1 px-4 rounded-[10px] cursor-pointer transition duration-150
                                    border-[2px] border-solid text-[#efff94] text-[14px] hover:opacity-[0.8]'
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Finish
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title={data.title}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                centered
                width={450}
                footer={
                    isLoading ?
                        <Button type="primary" loading iconPosition={'end'}>
                            Loading
                        </Button>
                        :
                        <Button type='primary' onClick={() => handleFinish()}>
                            Claim reward
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

export default Lesson