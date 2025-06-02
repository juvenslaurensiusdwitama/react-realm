import Menu from '../../../components/Menu';
import bgQuest from '../../../assets/bg-quest.png'
import gandalf from '../../../assets/gandalf.png'
import arrow from '../../../assets/arrow-pixel.png'
import BadgesValidation from '../../../components/BadgesValidation';
import { useState } from 'react';

const Lesson = ({ data, loading }) => {
    const [contentIndex, setContentIndex] = useState(0)
    if (loading) return <div>Loading...</div>;
    console.log(data)
    
    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgQuest})` }}
        >
            <Menu />
            <div className='flex flex-col my-8 rounded-[16px] border-[4px] border-[#F6F8D5] 
                border-solid w-[750px]'>
                <div className='bg-[#205781] min-h-[370px] rounded-t-[12px] py-3 px-4'>
                    <div className='flex justify-between text-[14px] text-[#efff94] font-semibold'>
                        <h1>{data.title}</h1>
                        <div className='flex gap-1'>
                            <p className='text-[#F6F8D5]'>Reward:</p>
                            <p className='text-[14px]'>{data.exp} exp</p>
                            <p className='text-[#F6F8D5]'>|</p>
                            <BadgesValidation data={data?.badges}/>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className='flex justify-between bg-[#4F959D] 
                min-h-[200px] rounded-b-[12px] py-3 pr-16 items-center'>
                    <img src={gandalf} alt="" className='h-[180px]'/>
                    <div className='flex flex-col gap-3'>
                        <p className='text-[#efff94] font-semibold'>{data.contents[contentIndex]}</p>
                        <div className='flex gap-1 justify-center'>
                            <img src={arrow} 
                                className={`cursor-pointer rotate-180 h-[24px] transition-all ${contentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-125'}`} 
                                onClick={() => contentIndex > 0 && setContentIndex(contentIndex - 1)}
                            />
                            <img src={arrow} 
                                className={`cursor-pointer h-[24px] transition-all ${contentIndex === data.contents.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-125'}`} 
                                onClick={() => contentIndex < data.contents.length - 1 && setContentIndex(contentIndex + 1)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lesson