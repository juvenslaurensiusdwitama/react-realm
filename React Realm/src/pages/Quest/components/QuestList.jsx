import arrow from '../../../assets/next-icon.png'
import bronzeThropy from '../../../assets/bronze24.png'
import silverThropy from '../../../assets/silver24.png'
import goldThropy from '../../../assets/gold24.png'
const QuestList = () => {

    const listQuest = [
        {
            title: 'Introduction to JSX',
            points: null,
            exp: 100,
            badges: 'badge',
            thropy: null
        },
        {
            title: 'Introduction to JSX (Quiz)',
            points: 100,
            exp: 100,
            badges: 'badge',
            thropy: bronzeThropy,
        },
        {
            title: 'What is React Components?',
            points: null,
            exp: 100,
            badges: 'badge',
            thropy: null
        },
        {
            title: 'What is React Components? (Quiz)',
            points: 100,
            exp: 100,
            badges: 'badge',
            thropy: silverThropy,
        },
        {
            title: 'How to use React Component?',
            points: null,
            exp: 100,
            badges: 'badge',
            thropy: null
        },
        {
            title: 'How to use React Component? (Quiz)',
            points: 100,
            exp: 100,     
            badges: 'badge',      
            thropy: goldThropy,
        },
    ]

    return (
        <div className='my-8 flex items-center text-[#F6F8D5]'>
            <div className='bg-[#205781] rounded-[16px] border-[10px] border-[#F6F8D5] border-double
            min-w-[750px] flex flex-col gap-4 justify-center pt-7 pb-8 px-8
        '>
                <div>
                    <h1 className='text-[32px] font-medium'>Quest List</h1>
                    <p>3 lessons • 3 quizzes</p>
                </div>
                <ul className='flex flex-col gap-4 font-semibold'>
                    {listQuest.map((quest, i) => (
                        <li className='bg-[#4F959D] p-4 rounded-[10px] flex justify-between border-[3px] 
                            border-[#F6F8D5] border-dashed hover:bg-[#74b6a0] cursor-pointer transition 
                            duration-200'
                        >
                            <h1>{quest.title}</h1>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-1'>
                                    <p className={quest.points === null ? 'hidden' : null}>{quest.points}pt</p>
                                    <p>{quest.points === null ? null : '•'}</p>
                                    <p>{quest.exp}exp</p>
                                    <p>•</p>
                                    <p>{quest.badges}</p>
                                    <p>{quest.thropy === null ? null : '•'}</p>
                                    <img src={quest.thropy} alt="" className={quest.thropy === null ? 'hidden' : null}/>
                                </div>
                                <img src={arrow} alt="arrow" className='h-[24px] ' />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default QuestList