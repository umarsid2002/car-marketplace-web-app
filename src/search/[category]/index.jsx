import Navbar from '@/components/Navbar'
import Search from '@/components/Search'
import { db } from './../../../configs'
import React from 'react'
import { useParams } from 'react-router-dom'
import { CarImages, carListing } from './../../../configs/schema'
import { eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'
import Service from '@/shared/Service'
import CarItem from '@/components/CarItem'

const SearchByCategory = () => {
  
  const {category} = useParams()
  const [carList, setCarList] = useState([])

  useEffect(() => {
    GetCarList()
  }, [])
  

  const GetCarList = async () => {
    const result = await db.select().from(carListing)
    .innerJoin(CarImages, eq(carListing.id, CarImages.carListingId))
    .where(eq(carListing.category, category))

    const resp = Service.FormatResult(result)
    setCarList(resp)
  }

  return (
    <div>
        <Navbar/>

        <div className='p-10 bg-black flex justify-center'>
            <Search/>
        </div>
        <div className='p-10 md:px-20'>
          <h2 className='font-bold text-4xl'>{category}</h2>

          {/* list of carlist */}
          <div className='grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-5 mt-7'>
          {carList.length > 0 ? carList.map((item,index)=>{
            return <div key={index}>
              <CarItem car={item} />
            </div>
          }):
          [1,2,3,4,5,6].map((item,index)=>{
            return <div className='h-[350px] rounded-xl bg-slate-200 animate-pulse'>

            </div>
          })
          }
        </div>
    </div>
    </div>
  )
}

export default SearchByCategory