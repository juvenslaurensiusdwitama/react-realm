import { collection, getDocs, query, orderBy, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../../config/firestore'
import { useEffect, useState } from 'react';
import AvatarValidation from '../../../components/AvatarValidation'
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const ShopList = () => {
    const id = sessionStorage.getItem('id')
    const navigate = useNavigate()
    const [userDetail, setUserDetail] = useState()
    const [avatarList, setAvatarList] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const [isPurchase, setIsPurchase] = useState(false)
    const [isFailedPurchase, setIsFailedPurchase] = useState(false)
    const [newAvatar, setNewAvatar] = useState()
    const [newAvatarPrice, setNewAvatarPrice] = useState()

    const getUserById = async () => {
        try {
            setIsLoading(true)
            const q = doc(collection(db, "users"), id);
            const userData = await getDoc(q);
            if (userData.exists()) setUserDetail(userData.data())
        } catch (err) {
            console.error(err)
        }
        setIsLoading(false)
    }

    const getAvatarList = async () => {
        try {
            setIsLoading(true)
            const q = query(collection(db, "avatarList"), orderBy("price", "asc"))
            const querySnapshot = await getDocs(q)
            const avatars = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setAvatarList(avatars)
        } catch (err) {
            console.error(err)
        }
        setIsLoading(false)
    }

    const handlePurchase = (avatarPoints, avatarName) => {
        if (userDetail?.points >= avatarPoints) {
            setIsPurchase(true)
            setNewAvatar(avatarName)
            setNewAvatarPrice(avatarPoints)
        } else {
            setIsFailedPurchase(true)
        }
    }

    const handleConfirmPurchase = async () => {
        try {
            setIsSubmitLoading(true)
            await setDoc(doc(db, "users", id), {
                ...userDetail,
                avatars: [...userDetail?.avatars, newAvatar],
                points: userDetail?.points - newAvatarPrice
            })
        } catch (err) {
            console.error(err)
        } finally {
            setIsSubmitLoading(false)
            setIsPurchase(false)
            getUserById()
        }
    }

    useEffect(() => {
        getUserById()
        getAvatarList()
    }, [])

    return (
        <div className="my-8 flex items-center text-[#ffe6cd]">
            <div className="bg-[#6F4E37] min-w-[992px] rounded-[12px] flex flex-col 
            gap-4 w-full pt-6 pb-8 px-8 border-[2px] border-[#FED8B1]
            ">
                <div className="flex justify-between items-center">
                    <h1 className="text-[32px] font-medium">Avatar Shop</h1>
                    <p className="text-[18px] font-medium bg-[#966e50] py-1 px-3 rounded-[4px]">{userDetail?.points} Points</p>
                </div>
                <div className='w-full flex justify-center'>
                    {isLoading ? <span className="loader mt-8"></span> : null}
                </div>
                <ul className="grid grid-cols-3 gap-3">
                    {avatarList?.map((avatar, i) => (
                        <li key={i} className="bg-[#A67B5B] w-[300px] rounded-[6px] py-2 pr-4 flex justify-center border-[2px] border-[#FED8B1]">
                            <AvatarValidation className='w-[150px]' data={avatar.img} />
                            <div className='flex flex-col justify-evenly'>
                                <div>
                                    <h1 className='text-[20px] font-semibold'>{avatar.name}</h1>
                                    <p className='text-[14px]'>{avatar.description}</p>
                                </div>
                                <button className='bg-[#6F4E37] cursor-pointer text-[14px] transition duration-200
                                    border-[2px] border-[#FED8B1] font-bold p-2 hover:bg-[#4e392b]'
                                    onClick={() => handlePurchase(avatar.price, avatar.img)}
                                >
                                    Buy for {avatar.price} pt
                                </button>
                            </div>
                        </li>
                    )
                    )}
                </ul>
            </div>
            <Modal
                title={'Avatar Shop'}
                open={isPurchase}
                onCancel={() => setIsPurchase(false)}
                centered
                width={450}
                footer={
                    isSubmitLoading ?
                        <Button type="primary" loading iconPosition={'end'}>
                            Loading
                        </Button>
                        :
                        <Button type='primary' onClick={() => handleConfirmPurchase()}>
                            Confirm Purchase
                        </Button>
                }
            >
                <p>You sure want to purchase for this avatar?</p>
            </Modal>
            <Modal
                title={'Avatar Shop'}
                open={isFailedPurchase}
                onCancel={() => setIsFailedPurchase(false)}
                centered
                width={450}
                footer={
                    <Button type='primary' onClick={() => navigate('/shop')}>
                        Return to shop
                    </Button>
                }
            >
                <p>Sorry, you dont have enough points to purchase this avatar</p>
            </Modal>
        </div>
    )
}

export default ShopList