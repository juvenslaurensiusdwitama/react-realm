import arrow from '../../../assets/next-icon.png'
const QuestList = () => {
  return (
    <div className='h-[62%] my-8 flex items-center text-[#F6F8D5]'>
        <div className='bg-[#205781] rounded-[16px] border-[10px] border-[#F6F8D5] border-double
            min-w-[750px] flex flex-col gap-4 justify-center pt-7 pb-8 px-8
        '>
            <div>    
                <h1 className='text-[32px] font-medium'>Quest List</h1>
                <p>3 lessons • 3 quizzes</p>
            </div>
            <ul className='flex flex-col gap-4 font-semibold'>
                <li className='bg-[#4F959D] p-4 rounded-[10px] flex justify-between border-[3px] border-[#F6F8D5] border-dashed
                hover:bg-[#7ec4ad] cursor-pointer'>
                    <div>Introduction to JSX</div>
                    <div className='flex items-center gap-3'>
                        <p>Reward: Badge, Exp</p>
                        <img src={arrow} alt="arrow" className='h-[24px]'/>
                    </div>
                </li>
                <li className='bg-[#4F959D] p-4 rounded-[10px] flex justify-between border-[3px] border-[#F6F8D5] border-dashed
                hover:bg-[#7ec4ad] cursor-pointer'>
                    <div>Introduction to JSX (Quiz)</div>
                    <div className='flex items-center gap-3'>
                        <p>Reward: Badge, Points, Throphy, Exp</p>
                        <img src={arrow} alt="arrow" className='h-[24px]'/>
                    </div>
                </li>
                <li className='bg-[#4F959D] p-4 rounded-[10px] flex justify-between border-[3px] border-[#F6F8D5] border-dashed
                hover:bg-[#7ec4ad] cursor-pointer'>
                    <div>What is React Components?</div>
                    <div className='flex items-center gap-3'>
                        <p>Reward: Badge, Exp</p>
                        <img src={arrow} alt="arrow" className='h-[24px]'/>
                    </div>
                </li>
                <li className='bg-[#4F959D] p-4 rounded-[10px] flex justify-between border-[3px] border-[#F6F8D5] border-dashed
                hover:bg-[#7ec4ad] cursor-pointer'>
                    <div>What is React Components? (Quiz)</div>
                    <div className='flex items-center gap-3'>
                        <p>Reward: Badge, Points, Throphy, Exp</p>
                        <img src={arrow} alt="arrow" className='h-[24px]'/>
                    </div>
                </li>
                <li className='bg-[#4F959D] p-4 rounded-[10px] flex justify-between border-[3px] border-[#F6F8D5] border-dashed
                hover:bg-[#7ec4ad] cursor-pointer'>
                    <div>How to use React Component?</div>
                    <div className='flex items-center gap-3'>
                        <p>Reward: Badge, Exp</p>
                        <img src={arrow} alt="arrow" className='h-[24px]'/>
                    </div>
                </li>
                <li className='bg-[#4F959D] p-4 rounded-[10px] flex justify-between border-[3px] border-[#F6F8D5] border-dashed
                hover:bg-[#7ec4ad] cursor-pointer'>
                    <div>How to use React Component? (Quiz)</div>
                    <div className='flex items-center gap-3'>
                        <p>Reward: Badge, Points, Throphy, Exp</p>
                        <img src={arrow} alt="arrow" className='h-[24px]'/>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default QuestList