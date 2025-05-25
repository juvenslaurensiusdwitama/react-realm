import arrow from '../../../assets/next-icon.png'
const QuestList = () => {

    const listQuest = [
        {
            title: 'Introduction to JSX',
            reward: 'Reward: Badge, Exp',
        },
        {
            title: 'Introduction to JSX (Quiz)',
            reward: 'Reward: Badge, Points, Throphy, Exp',
        },
        {
            title: 'What is React Components?',
            reward: 'Reward: Badge, Exp',
        },
        {
            title: 'What is React Components? (Quiz)',
            reward: 'Reward: Badge, Points, Throphy, Exp',
        },
        {
            title: 'How to use React Component?',
            reward: 'Reward: Badge, Exp',
        },
        {
            title: 'How to use React Component? (Quiz)',
            reward: 'Reward: Badge, Points, Throphy, Exp',
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
                        <li className='bg-[#4F959D] p-4 rounded-[10px] flex justify-between border-[3px] border-[#F6F8D5] border-dashed
                            hover:bg-[#74b6a0] cursor-pointer transition duration-200'>
                            <div>{quest.title}</div>
                            <div className='flex items-center gap-3'>
                                <p>{quest.reward}</p>
                                <img src={arrow} alt="arrow" className='h-[24px]' />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default QuestList