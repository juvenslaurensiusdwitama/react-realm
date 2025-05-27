import fireMage from '../../../assets/fireMage.png'
import archer from '../../../assets/archer.png'
import necromancer from '../../../assets/necromancer.png'
import swordsMan from '../../../assets/swordsMan.png'
import rogue from '../../../assets/rogue.png'
import cleric from '../../../assets/cleric.png'
import berserker from '../../../assets/berserker.png'
import iceMage from '../../../assets/iceMage.png'

const ShopList = () => {
    const listAvatar = [
        {
            name: 'Archer',
            description: 'Swift hunter landing perfect shots.',
            img: archer,
            price: 100
        },
        {
            name: 'Fire Mage',
            description: 'Pyromancer hurling blazing orbs.',
            img: fireMage,
            price: 150
        },
        {
            name: 'Berserker',
            description: 'Wild berserker crushing foes.',
            img: berserker,
            price: 200
        },
        {
            name: 'Rogue',
            description: ' Silent assassin from the shadows.',
            img: rogue,
            price: 250
        },
        {
            name: 'Knight',
            description: 'Armored warrior with big sword.',
            img: swordsMan,
            price: 300
        },
        {
            name: 'Cleric',
            description: 'Benevolent mender radiating cure spells.',
            img: cleric,
            price: 350
        },
        {
            name: 'Ninja',
            description: 'Agile phantom vanishing enemies.',
            img: necromancer,
            price: 400
        },
        {
            name: 'Ice Mage',
            description: 'Frost caster freezing enemies solid.',
            img: iceMage,
            price: 450
        },
        {
            name: 'Necromancer',
            description: 'Dark summoner from underground.',
            img: necromancer,
            price: 500
        },
    ]

    return (
        <div className="my-8 flex items-center text-[#ffe6cd]">
            <div className="bg-[#6F4E37] min-w-[750px] rounded-[12px] 
                flex flex-col gap-4 w-full pt-6 pb-8 px-8 border-[2px] border-[#FED8B1]
            ">
                <div className="flex justify-between items-center">
                    <h1 className="text-[32px] font-medium">Avatar Shop</h1>
                    <p className="text-[18px] font-medium bg-[#A67B5B] py-1 px-3 rounded-[6px]">100 Points</p>
                </div>
                <ul className="grid grid-cols-3 gap-3">
                    {listAvatar.map((avatar, i) => (
                        <li className="bg-[#A67B5B] w-[300px] rounded-[6px] py-2 pr-4 flex justify-center border-[2px] border-[#FED8B1]">
                            <img src={avatar.img} alt="avatar" className='w-[150px]' />
                            <div className='flex flex-col justify-evenly'>
                                <div>
                                    <h1 className='text-[20px] font-semibold'>{avatar.name}</h1>
                                    <p className='text-[14px]'>{avatar.description}</p>
                                </div>
                                <button className='bg-[#6F4E37] cursor-pointer text-[14px] transition duration-200
                                    border-[2px] border-[#FED8B1] font-bold p-2 hover:bg-[#4e392b]
                                '>
                                    Buy for {avatar.price}pt
                                </button>
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