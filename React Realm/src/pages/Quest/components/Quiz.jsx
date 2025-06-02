import bgQuest from '../../../assets/bg-quest.png'
import Menu from '../../../components/Menu';

const Quiz = ({ data, loading }) => {
    if (loading) return <div>Loading...</div>;
    console.log(data)
    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgQuest})` }}
        >
            <Menu />
            <h1>{data?.type}</h1>
        </div>
    )
}

export default Quiz