import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../../../config/firestore'
import { useEffect, useState } from 'react';
import AvatarValidation from '../../../components/AvatarValidation'

const ShopList = () => {
    const [avatarList, setAvatarList] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const getAvatarList = async() =>{
        try{
            setIsLoading(true)
            const q = query(collection(db, "avatarList"), orderBy("price", "asc"))
            const querySnapshot = await getDocs(q)
            const avatars = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setAvatarList(avatars)
        }catch(err){
            console.error(err)
        }
        setIsLoading(false)
    }

    useEffect(()=>{
        getAvatarList()
    },[])
    

    return (
        <div className="my-8 flex items-center text-[#ffe6cd]">
            <div className="bg-[#6F4E37] min-w-[992px] rounded-[12px] flex flex-col 
            gap-4 w-full pt-6 pb-8 px-8 border-[2px] border-[#FED8B1]
            ">
                <div className="flex justify-between items-center">
                    <h1 className="text-[32px] font-medium">Avatar Shop</h1>
                    <p className="text-[18px] font-medium bg-[#966e50] py-1 px-3 rounded-[6px]">100 Points</p>
                </div>
                <div className='w-full flex justify-center'>
                    {isLoading ? <span className="loader mt-8"></span> : null}
                </div>
                <ul className="grid grid-cols-3 gap-3">
                    {avatarList?.map((avatar, i) => (
                        <li key={i} className="bg-[#A67B5B] w-[300px] rounded-[6px] py-2 pr-4 flex justify-center border-[2px] border-[#FED8B1]">
                            <AvatarValidation className='w-[150px]' data={avatar.img}/>
                            <div className='flex flex-col justify-evenly'>
                                <div>
                                    <h1 className='text-[20px] font-semibold'>{avatar.name}</h1>
                                    <p className='text-[14px]'>{avatar.description}</p>
                                </div>
                                <button className='bg-[#6F4E37] cursor-pointer text-[14px] transition duration-200
                                    border-[2px] border-[#FED8B1] font-bold p-2 hover:bg-[#4e392b]
                                '>
                                    Buy for {avatar.price} pt
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