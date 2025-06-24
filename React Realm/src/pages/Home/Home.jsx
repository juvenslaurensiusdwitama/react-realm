import Menu from '../../components/Menu';
import bgHome from '../../assets/bg-home.jpg';
import { getFirestore, doc, getDoc, collection, setDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Flex, Modal, Progress } from 'antd';
import BadgesValidation from '../../components/BadgesValidation';
import ThropyValidation from '../../components/ThropyValidation';
import AvatarValidation from '../../components/AvatarValidation';
import easterEgg from '../../assets/easterEgg.png';
import petGriffin from '../../assets/petGriffin.png';
import petDragon from '../../assets/petDragon.png';
import petHydra from '../../assets/petHydra.png';

const Home = () => {
    const id = sessionStorage.getItem('id');
    const db = getFirestore();
    const levelThresholds = [0, 100, 250, 450, 700, 1000, 1350];
    const pets = ["dragon", "griffin", "hydra"]
    const [level, setLevel] = useState(0);
    const [userDetail, setUserDetail] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [isEasterEggOpened, setIsEasterEggOpened] = useState(false)
    const [pet, setPet] = useState(null);

    const getUserById = async () => {
        try {
            setIsLoading(true);
            const q = doc(collection(db, "users"), id);
            const userData = await getDoc(q);
            if (userData.exists()) {
                const data = userData.data();
                setUserDetail(data);
                setLevel(getLevelFromExp(data.exp));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelect = async () => {
        try {
            setIsLoading(true);
            await setDoc(doc(db, "users", id), {
                ...userDetail,
                activeAvatar: selectedAvatar,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
            getUserById();
        }
    };

    const getLevelFromExp = (exp) => {
        for (let i = levelThresholds.length - 1; i >= 0; i--) {
            if (exp >= levelThresholds[i]) {
                return i + 1;
            }
        }
        return 1;
    };

    const getProgressToNextLevel = () => {
        const exp = userDetail?.exp || 0;
        const currentLevelIndex = level - 1;
        const currentThreshold = levelThresholds[currentLevelIndex] || 0;
        const nextThreshold = levelThresholds[currentLevelIndex + 1] || exp;

        const progress = exp - currentThreshold;
        const required = nextThreshold - currentThreshold;
        const percent = ((progress / required) * 100).toFixed(1);

        return { progress, required, percent };
    };

    const handleEasterEgg = () => {
        const randomPet = pets[Math.floor(Math.random() * pets.length)];
        setPet(randomPet)
        setIsEasterEggOpened(true)
    }

    const handleUpdatePet = async () => {
        try {
            setIsSubmitLoading(true)
            setIsLoading(true)
            await setDoc(doc(db, "users", id), {
                ...userDetail,
                easterEggOpened: true,
                pet: pet,
            })
        } catch (err) {
            console.error(err)
        } finally {
            setIsSubmitLoading(false)
            setIsLoading(false)
            setIsEasterEggOpened(false)
            getUserById();
        }
    }

    useEffect(() => {
        getUserById();
    }, []);

    const progressData = userDetail ? getProgressToNextLevel() : { progress: 0, required: 0, percent: 0 };
    
    return (
        <div
            className="h-screen bg-cover bg-center flex flex-col items-center relative"
            style={{ backgroundImage: `url(${bgHome})` }}
        >
            <Menu />
            <div className='bg-slate-900/80 backdrop-blur-xs 
                text-white p-4 flex flex-col gap-2 min-h-[400px] min-w-[450px]'>
                {isLoading ?
                    <div className='h-full w-full flex items-center justify-center'>
                        <span className="loader"></span>
                    </div>
                    :
                    <>
                        <div className='flex justify-between items-start'>
                            <div className='min-w-[380px] flex flex-col bg-slate-500/40 py-2 px-4'>
                                <h1 className='text-[16px] font-semibold'>{userDetail?.username}</h1>
                                <div className='flex justify-between text-[14px]'>
                                    <p>Level {level}</p>
                                    <p className="text-[12px] text-white text-end">
                                        {userDetail?.exp} / {progressData.required + levelThresholds[level - 1]} Exp
                                    </p>
                                </div>
                                <ConfigProvider theme={{ components: { Progress: { colorText: '#ffff' } } }}>
                                    <Flex vertical gap="small" style={{ width: '100%' }}>
                                        <Progress
                                            percent={parseFloat(progressData.percent)}
                                            size="small"
                                            status="active"
                                        />
                                    </Flex>
                                </ConfigProvider>
                                <div className='flex flex-col gap-1 bg-slate-500/40 px-1 py-1 my-1'>
                                    <div className='flex items-center gap-1'>
                                        {userDetail?.badges.length ?
                                            userDetail.badges.map((badge, idx) =>
                                                <BadgesValidation key={idx} data={badge} />
                                            ) : <p className='text-[12px] w-full text-center'>No badges</p>}
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        {userDetail?.thropy.length ?
                                            userDetail.thropy.map((thropy, idx) =>
                                                <ThropyValidation key={idx} data={thropy} />
                                            ) : <p className='text-[12px] w-full text-center'>No thropy</p>}
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <p className='px-1 text-end text-[14px]'>{userDetail?.points} Points</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-end gap-2'>
                                <div className='flex flex-col items-end'>
                                    <p className='font-semibold text-[14px]'>Acquired Title</p>
                                    {userDetail?.badges.length ?
                                        userDetail.badges.map((badge, idx) =>
                                            <p key={idx} className='text-[12px] underline underline-offset-2'>
                                                {{
                                                    "Novice Coder": "Novice Coder",
                                                    "React Enthusiast": "React Enthusiast",
                                                    "JSX Debugger": "JSX Debugger",
                                                    "JSX Architect": "JSX Architect",
                                                    "Component Master": "Component Master",
                                                    "Component Expert": "Component Expert"
                                                }[badge] || null}
                                            </p>
                                        ) : <p className='text-[12px] w-full'>No acquired title</p>}
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-between'>
                            <div className='grid grid-cols-3 gap-2 items-start'>
                                {userDetail?.avatars.map((avatar, idx) => {
                                    const isSelected = avatar === (selectedAvatar || userDetail?.activeAvatar);
                                    return (
                                        <div
                                            key={idx}
                                            className={`${isSelected ? 'bg-slate-400/50' : 'bg-slate-500/40 cursor-pointer hover:opacity-[0.6]'}`}
                                            onClick={() => !isSelected && setSelectedAvatar(avatar)}
                                        >
                                            <AvatarValidation className='w-[100px] p-1' data={avatar} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <div className='relative'>
                                    <AvatarValidation
                                        className='w-[210px]'
                                        data={selectedAvatar || userDetail?.activeAvatar}
                                    />
                                    {userDetail?.pet &&
                                        <img src={
                                            userDetail?.pet === 'griffin' ? petGriffin
                                            : userDetail?.pet === 'dragon' ? petDragon
                                            : userDetail?.pet === 'hydra' ? petHydra
                                            : null
                                        } alt="pet" className={userDetail?.pet === 'hydra' ? 'w-[80px] absolute top-0 scale-x-[-1]' : 'w-[80px] absolute top-0'}/>
                                    }
                                </div>
                                <button
                                    className='bg-slate-500/40 px-6 py-1 font-semibold 
                                    transition duration-100 cursor-pointer hover:opacity-[0.6]'
                                    onClick={handleSelect}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    </>}
            </div>
            {userDetail?.easterEggOpened ?
                null
                :
                <img src={easterEgg} alt=""
                    className='absolute bottom-0 right-0 h-[150px] transition
                    cursor-pointer hover:opacity-[0.7] duration-100'
                    onClick={() => handleEasterEgg()}
                />}
            <Modal
                title={"Easter egg 🐣"}
                open={isEasterEggOpened}
                onCancel={() => setIsEasterEggOpened(false)}
                centered
                width={450}
                footer={
                    isSubmitLoading ?
                        <Button type="primary" loading iconPosition={'end'}>
                            Loading
                        </Button>
                        :
                        <Button type='primary' onClick={() => handleUpdatePet()}>
                            Claim pet reward
                        </Button>
                }
            >
                <p>Congrats you got {pet} as your pet! 🥳</p>
            </Modal>
        </div>
    );
};

export default Home;
