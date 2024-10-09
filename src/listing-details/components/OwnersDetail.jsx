import { Button } from '@/components/ui/button'
import Service from '@/shared/Service'
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const OwnersDetail = ({carDetail}) => {

  const {user} = useUser()

  const navigation = useNavigate()

  const OnMessageOwnerButtonClick = async () => {

    const userId = (user.primaryEmailAddress.emailAddress).split('@')[0]
    const ownerUserId = carDetail.createdBy.split('@')[0]

    // Create Current user Id
    try {
      await Service.CreateSendBirdUser(userId, user?.fullName, user.imageUrl)
      .then(resp=>{
        console.log(resp)
      })
    } catch (error) {
      
    }

    // Owner User Id
    try {
      await Service.CreateSendBirdUser(ownerUserId, carDetail?.userName, carDetail.imageUrl)
      .then(resp=>{
        console.log(resp)
      })
      console.log(ownerUserId)
    } catch (error) {
      
    }

    // Create Channel
    try {
      await Service.CreateSendBirdChannel([userId, ownerUserId], carDetail?.listingTitle)
      .then((resp)=>{
        console.log(resp)
        console.log('channel created')
        navigation('/profile')
      })
      
    } catch (error) {
      
    }
  }

  return (
    <div className='p-10 border rounded-xl shadow-md mt-7'>
        <h2 className='font-medium text-2xl mb-3'>Owner / Deal Details</h2>
        <img src={carDetail?.userImageUrl} className='w-[70px] h-[70px] rounded-md' />
        <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
        <h2 className='mt-2 text-gray-500'>{carDetail?.createdBy}</h2>
        <Button onClick={OnMessageOwnerButtonClick} className='w-full mt-6'>Message Owner For Details</Button>
    </div>
  )
}

export default OwnersDetail