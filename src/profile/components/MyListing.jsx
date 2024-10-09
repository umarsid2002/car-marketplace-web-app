import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { db } from './../../../configs'
import { CarImages, carListing } from './../../../configs/schema'
import { desc, eq } from 'drizzle-orm'
import { useUser } from '@clerk/clerk-react'
import Service from '@/shared/Service'
import CarItem from '@/components/CarItem'
import { FaTrashAlt } from "react-icons/fa";


const MyListing = () => {

    const {user} = useUser()
    const [carList, setCarList] = useState([])

    useEffect(() => {
      user && getUserCarListing()
    
    }, [user])
    

    const getUserCarListing = async () => {
        const result = await db.select().from(carListing)
        .leftJoin(CarImages, eq(carListing.id, CarImages.carListingId))
        .where(eq(carListing.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(carListing.id))

        const resp = Service.FormatResult(result)
        console.log(resp)
        setCarList(resp)
    }

  return (
    <div>
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-4xl'>My Listing</h2>
            <Link to={'/add-listing'}>            
                <Button className=''>+ Add New Listing</Button>
            </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 gap-5'>
          {carList.map((item,index)=>{
            return <div key={index}>
              <CarItem car={item} />
              <div className='p-2 bg-gray-100 rounded-lg flex justify-between gap-3'>
                <Link to={'/add-listing?mode=edit&id='+ item.id}>
                  <Button variant='outline' className='w-full'>Edit</Button>
                </Link>
                <Button variant='destructive'><FaTrashAlt /></Button>
              </div>
            </div>
          })}
        </div>
    </div>
  )
}

export default MyListing