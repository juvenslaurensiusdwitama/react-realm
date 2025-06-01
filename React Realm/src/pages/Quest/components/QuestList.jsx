import arrow from '../../../assets/next-icon.png'
import bronzeThropy from '../../../assets/bronze24.png'
import silverThropy from '../../../assets/silver24.png'
import goldThropy from '../../../assets/gold24.png'
import noviceCoder from '../../../assets/noviceCoder24.png'
import reactEnthusiast from '../../../assets/reactEnthusiast24.png'
import jsxDebugger from '../../../assets/jsxDebugger24.png'
import jsxArchitect from '../../../assets/jsxArchitect24.png'
import componentMaster from '../../../assets/componentMaster24.png'
import componentExpert from '../../../assets/componentExpert24.png'
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../../../config/firestore'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            min-w-[610px] min-h-[280px] flex flex-col gap-4 items-center pt-7 pb-8 px-8
        '>
                <div className='flex flex-col items-start w-full'>
                    <h1 className='text-[32px] font-medium'>Quest List</h1>
                    <p>3 lessons • 3 quizzes</p>
                </div>
                {isLoading ? <span className="loader mt-8"></span> : null}
                <ul className='flex flex-col gap-4 font-semibold'>
                    {isLoading && questList ? null : questList?.map((quest, i) => (
                        <li key={i} className='bg-[#4F959D] p-4 rounded-[10px] flex justify-between border-[3px] 
                            border-[#F6F8D5] border-dashed hover:bg-[#74b6a0] cursor-pointer transition 
                            duration-200 gap-14 items-center'
                            onClick={() => navigate(quest.id)}
                        >
                            <h1>{quest.title}</h1>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-1'>
                                    <p className='text-[14px] text-[#efff94]'>{quest.points? quest.points + ' pt' : null}</p>
                                    <p>{quest.points ? '•' : null}</p>
                                    <p className='text-[14px] text-[#efff94]'>{quest.exp} exp</p>
                                    <p>•</p>
                                    <img src={
                                        quest.badges === "Novice Coder" ? noviceCoder 
                                        : quest.badges === "React Enthusiast" ? reactEnthusiast 
                                        : quest.badges === "JSX Debugger" ? jsxDebugger 
                                        : quest.badges === "JSX Architect" ? jsxArchitect
                                        : quest.badges === "Component Master" ? componentMaster
                                        : quest.badges === "Component Expert" ? componentExpert
                                        : null
                                    } alt="badges"/>
                                    <p className={quest.thropy ? null : 'hidden'}>{quest.thropy ? '•' : null}</p>
                                    <img src={
                                        quest.thropy === "bronzeThropy" ? bronzeThropy 
                                        : quest.thropy === "silverThropy" ? silverThropy 
                                        : quest.thropy === "goldThropy" ? goldThropy : null 
                                    } alt="" className='h-[18px]'/>
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