import arrow from '../../../assets/next-icon.png'
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../../../config/firestore'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BadgesValidation from '../../../components/BadgesValidation'
import ThropyValidation from '../../../components/ThropyValidation';

const QuestList = () => {
    const [questList, setQuestList] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const getQuestList = async() =>{
        try{
            setIsLoading(true)
            const q = query(collection(db, "questList"), orderBy("exp", "asc"))
            const querySnapshot = await getDocs(q)
            const quests = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setQuestList(quests)
        }catch(err){
            console.error(err)
        }
        setIsLoading(false)
    }

    useEffect(()=>{
        getQuestList()
    },[])

    return (
        <div className='my-8 flex items-center text-[#F6F8D5]'>
            <div className='bg-[#205781] rounded-[16px] border-[10px] border-[#F6F8D5] border-double
            min-w-[612px] min-h-[280px] flex flex-col gap-4 items-center pt-7 pb-8 px-8
        '>
                <div className='flex flex-col items-start w-full'>
                    <h1 className='text-[32px] font-medium'>Quest List</h1>
                    <p>3 lessons • 3 quizzes</p>
                </div>
                {isLoading ? <span className="loader mt-8"></span> : null}
                <ul className='flex flex-col gap-4 font-semibold'>
                    {isLoading && questList ? null : questList?.map((quest, i) => (
                        <li key={i} className='bg-[#4F959D] p-4 rounded-[10px] flex justify-between border-[3px] 
                            border-[#F6F8D5] border-solid hover:bg-[#74b6a0] cursor-pointer transition 
                            duration-200 gap-14 items-center'
                            onClick={() => navigate(quest.id)}
                        >
                            <h1>{quest.title}</h1>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-1'>
                                    <p className='text-[14px] text-[#efff94]'>{quest.points ? quest.points + ' pt' : null}</p>
                                    <p>{quest.points ? '•' : null}</p>
                                    <p className='text-[14px] text-[#efff94]'>{quest.exp} exp</p>
                                    <p>•</p>
                                    <BadgesValidation data={quest.badges}/>
                                    <p className={quest.thropy ? null : 'hidden'}>{quest.thropy ? '•' : null}</p>
                                    <ThropyValidation data={quest.thropy}/>
                                </div>
                                <img src={arrow} alt="arrow" className='h-[18px] ' />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default QuestList