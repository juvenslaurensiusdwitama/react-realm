import fireMage from '../../../assets/fireMage.png'
import archer from '../../../assets/archer.png'
import necromancer from '../../../assets/necromancer.png'
import swordsMan from '../../../assets/swordsMan.png'
import rogue from '../../../assets/rogue.png'
import cleric from '../../../assets/cleric.png'
import berserker from '../../../assets/berserker.png'

const ShopList = () => {
    const listAvatar = [
        {
            name: 'Archer',
            description: 'Swift hunter landing perfect shots.',
            img: archer,
        },
        {
            name: 'Fire Mage',
            description: 'Pyromancer hurling blazing orbs.',
            img: fireMage,
        },
        {
            name: 'Berserker',
            description: 'Wild berserker crushing foes.',
            img: berserker,
        },
        {
            name: 'Rogue',
            description: ' Silent assassin from the shadows.',
            img: rogue,
        },
        {
            name: 'Knight',
            description: 'Armored warrior with big sword.',
            img: swordsMan,
        },
        {
            name: 'Cleric',
            description: 'Benevolent mender radiating cure spells.',
            img: cleric,
        },
        {
            name: 'Necromancer',
            description: 'Dark summoner from the underground.',
            img: necromancer,
        },
        {
            name: 'Necromancer',
            description: 'Dark summoner from the underground.',
            img: necromancer,
        },
        {
            name: 'Necromancer',
            description: 'Dark summoner from the underground.',
            img: necromancer,
        },
    ]

    return (
        <div className="my-8 flex items-center text-[#FED8B1]">
            <div className="bg-[#6F4E37] min-w-[750px] rounded-[12px] 
                flex flex-col gap-4 w-full pt-6 pb-8 px-8 border-[8px] border-[#A67B5B]
            ">
                <div className="flex justify-between items-center">
                    <h1 className="text-[32px] font-medium">Shop List</h1>
                    <p className="text-[18px] font-medium">100 Points</p>
                </div>
                <ul className="grid grid-cols-3 gap-3">
                    {listAvatar.map((avatar, i) => (
                        <li className="bg-[#A67B5B] w-[300px] rounded-[6px] p-2 flex">
                            <img src={avatar.img} alt="" className='w-[150px]' />
                            <div className='flex flex-col justify-evenly'>
                                <div>
                                    <h1 className='text-[20px] font-semibold'>{avatar.name}</h1>
                                    <p className='text-[14px]'>{avatar.description}</p>
                                </div>
                                <button className='bg-[#6F4E37] text-[#FED8B1]  font-bold p-2'>BUY</button>
                            </div>
                        </li>
                    )
                    )}
                </ul>
            </div>
        </div>
    )
}

export default ShopList