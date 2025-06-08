import bgQuest from '../../../assets/bg-quest.png'
import BadgesValidation from '../../../components/BadgesValidation';
import Menu from '../../../components/Menu';

const Quiz = ({ data }) => {

    console.log(data)
    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgQuest})` }}
        >
            <Menu />
            <div className='flex flex-col my-8 py-3 px-4 rounded-[16px] text-[#F6F8D5]
                border-[4px] border-[#F6F8D5] border-solid w-[750px] bg-[#205781] h-[500px]'
            >
                <div className='flex justify-between text-[14px] font-semibold'>
                    <h1>{data.title}</h1>
                    <div className='flex gap-1'>
                        <p>Reward:</p>
                        <p className='text-[14px] text-[#efff94]'>{data.exp} exp</p>
                        <p>|</p>
                        <BadgesValidation data={data.badges} />
                    </div>
                </div>
                <div>question</div>
                <div>answer</div>
            </div>
        </div>
    )
}

export default Quiz