import Menu from '../../../components/Menu';
import bgQuest from '../../../assets/bg-quest.png'
import gandalf from '../../../assets/gandalf.png'
import arrow from '../../../assets/arrow-pixel.png'
import BadgesValidation from '../../../components/BadgesValidation';
import { Modal } from 'antd';
import { useState } from 'react';

const Lesson = ({ data, loading }) => {
    const [contentIndex, setContentIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (loading) return <div>Loading...</div>;
    console.log(data)

    const handleFinish = () => {
        setIsModalOpen(false)
        
    }

    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgQuest})` }}
        >
            <Menu />
            <div className='flex flex-col my-8 rounded-[16px] border-[4px] border-[#F6F8D5] 
                border-solid w-[750px]'>
                <div className='bg-[#205781] min-h-[370px] rounded-t-[12px] py-3 px-4'>
                    <div className='flex justify-between text-[14px] text-[#F6F8D5] font-semibold'>
                        <h1>{data.title}</h1>
                        <div className='flex gap-1'>
                            <p>Reward:</p>
                            <p className='text-[14px] text-[#efff94]'>{data.exp} exp</p>
                            <p>|</p>
                            <BadgesValidation data={data.badges} />
                        </div>
                    </div>
                    <div></div>
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
                onOk={() => handleFinish()}
                onCancel={() => setIsModalOpen(false)}
                centered
                width={450}
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