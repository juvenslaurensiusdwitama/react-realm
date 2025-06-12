import { useEffect, useState } from 'react';
import bgQuest from '../../../assets/bg-quest.png'
import BadgesValidation from '../../../components/BadgesValidation';
import arrow from '../../../assets/arrow-pixel.png'
import Menu from '../../../components/Menu';
import AvatarValidation from '../../../components/AvatarValidation';
import { getFirestore, doc, getDoc, collection, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import ThropyValidation from '../../../components/ThropyValidation';

const Quiz = ({ data }) => {
    const id = sessionStorage.getItem('id')
    const db = getFirestore();
    const [userDetail, setUserDetail] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const [contentIndex, setContentIndex] = useState(0)
    const [isCorrectModalOpen, setIsCorrectModalOpen] = useState(false);
    const [isWrongModalOpen, setIsWrongModalOpen] = useState(false);
    const [allAnswer, setAllAnswer] = useState({})
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

    const handleAnswer = (answer) => {
        if (contentIndex === 0) setAllAnswer({ ...allAnswer, answerOne: answer })
        if (contentIndex === 1) setAllAnswer({ ...allAnswer, answerTwo: answer })
        if (contentIndex === 2) setAllAnswer({ ...allAnswer, answerThree: answer })
    }

    const handleFinish = async () => {
        if (allAnswer.answerOne === data.contents[0].correctAnswer
            && allAnswer.answerTwo === data.contents[1].correctAnswer
            && allAnswer.answerThree === data.contents[2].correctAnswer) {
            setIsCorrectModalOpen(true)
        } else {
            setIsWrongModalOpen(true)
        }
    }

    const handleReward = async() => {
        try {
            setIsSubmitLoading(true)
            const newBadges = userDetail?.badges.includes(data.badges) ? userDetail?.badges : [...userDetail?.badges, data.badges]
            const newThropy = userDetail?.thropy.includes(data.thropy) ? userDetail?.thropy : [...userDetail?.thropy, data.thropy]
            const argument1 = data.title === 'The Foundation of React (Lesson)'
            const argument2 = data.title === 'The Foundation of React (Quiz)'
            const argument3 = data.title === 'JSX (Lesson)'
            const argument4 = data.title === 'JSX (Quiz)'
            const argument5 = data.title === 'All About Components (Lesson)'
            const nextQuest = argument1 ? 'The Foundation of React (Quiz)' : argument2 ? 'JSX (Lesson)' : argument3 ? 'JSX (Quiz)' : argument4 ? 'All About Components (Lesson)' : argument5 ? 'All About Components (Quiz)' : null
            const newQuest = userDetail?.unlockedQuest.includes(nextQuest) ? userDetail?.unlockedQuest : [...userDetail?.unlockedQuest, nextQuest]
            await setDoc(doc(db, "users", id), {
                ...userDetail,
                thropy: newThropy,
                badges: newBadges,
                exp: userDetail.exp + data.exp,
                points: userDetail.points + data.points,
                unlockedQuest: newQuest,
            })
        } catch (err) {
            console.error(err)
        } finally {
            setIsSubmitLoading(false)
            setIsCorrectModalOpen(false)
            navigate('/quest')
        }
    }
    // console.log(userDetail)
    console.log(data.title)
    const handleProgressLoss = async() =>{
        try {
            setIsSubmitLoading(true)
            await setDoc(doc(db, "users", id), {
                ...userDetail,
                exp: userDetail.exp - data.minusExp,
            })
        }catch(err){
            console.error(err)
        }finally{
            setIsSubmitLoading(false)
            setIsWrongModalOpen(false)
            navigate('/quest')
        }
    }

    useEffect(() => {
        getUserById()
    }, [])

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
                <div className='w-full flex justify-between items-center text-[14px] font-semibold'>
                    <h1>{data.title}</h1>
                    <div className='flex gap-1 items-center'>
                        <p>Reward:</p>
                        <p className='text-[14px] text-[#efff94]'>{data.points} pt</p>
                        <p>|</p>
                        <p className='text-[14px] text-[#efff94]'>{data.exp} exp</p>
                        <p>|</p>
                        <BadgesValidation data={data.badges} />
                        <p>|</p>
                        <ThropyValidation data={data.thropy} />
                    </div>
                </div>
                <h1 className='text-[28px] font-semibold w-full text-center'>{data.contents[contentIndex].question}</h1>
                <div className='flex justify-between items-center'>
                    <AvatarValidation data={userDetail?.activeAvatar} className={'w-[230px] h-fit'} />
                    <div className='flex flex-col gap-4 w-full'>
                        {data.contents[contentIndex].answer.map((item, i) =>
                            <p className={`bg-[#4F959D] text-[18px] p-2 rounded-[8px] h-fit
                                border-[2px] border-[#F6F8D5] border-solid font-semibold 
                                cursor-pointer transition duration-200
                                ${item === allAnswer.answerOne ||
                                    item === allAnswer.answerTwo ||
                                    item === allAnswer.answerThree ? 'bg-amber-500' : 'hover:bg-[#74b6a0] '
                                }`}
                                onClick={() => handleAnswer(item)} key={i}
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
                <div className='flex justify-end items-center gap-4 my-2'>
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
                            onClick={() => handleFinish()}
                        >
                            Finish
                        </button>}
                </div>
            </div>
            <Modal
                title={data.title}
                open={isCorrectModalOpen}
                onCancel={() => setIsCorrectModalOpen(false)}
                centered
                width={450}
                footer={
                    isSubmitLoading ?
                        <Button type="primary" loading iconPosition={'end'}>
                            Loading
                        </Button>
                        :
                        <Button type='primary' onClick={() => handleReward()}>
                            Claim reward
                        </Button>
                }
            >
                <p>Congratulations ✨ You got a perfect score!</p>
                <div className='flex flex-col gap-1 items-start pt-1'>
                    <p>Here's Your Reward:</p>
                    <div className='flex gap-1'>
                        <p>{data.points} pt</p>
                        <p>|</p>
                        <p>{data.exp} exp</p>
                        <p>|</p>
                        <div className='flex gap-1'>
                            <div className='flex items-center ml-[-2px] gap-1'>
                                <BadgesValidation data={data.badges} />
                                <p>{data.badges}</p>
                            </div>
                            <p>|</p>
                            <div className='flex items-center gap-1'>
                                <ThropyValidation data={data.thropy} />
                                <p>{data.thropy === 'bronzeThropy' ? 'Bronze Thropy'
                                    : data.thropy === 'silverThropy' ? 'Silver Thropy'
                                        : data.thropy === 'goldThropy' ? 'Gold Thropy'
                                            : null}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                title={data.title}
                open={isWrongModalOpen}
                onCancel={() => setIsWrongModalOpen(false)}
                centered
                width={450}
                footer={
                    <Button type='primary' onClick={() => handleProgressLoss()}>
                        Return to quest
                    </Button>
                }
            >
                <p>Sorry, you can’t claim the reward and lost -{data?.minusExp} exp 😢. Fix the mistakes to earn the reward!</p>
            </Modal>
        </div>
    )
}

export default Quiz