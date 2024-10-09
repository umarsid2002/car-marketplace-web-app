import { CarImages, carListing } from './../../configs/schema'
import { db } from './../../configs'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { eq } from 'drizzle-orm'
import Service from '@/shared/Service'
import Navbar from '@/components/Navbar'
import Search from '@/components/Search'
import CarItem from '@/components/CarItem'

const SearchByOptions = () => {
    const [searchParam] = useSearchParams()
    const [carList, setCarList] = useState([])
    const condition = searchParam.get('cars')
    const make = searchParam.get('make')
    const price = searchParam.get('price')

    useEffect(() => {
        GetCarList()
    }, [])

    

    const GetCarList = async() => {
        const result = await db.select().from(carListing).innerJoin(CarImages, eq(carListing.id, CarImages.carListingId))
        .where(condition != undefined && eq(carListing.condition, condition))
        .where(make != undefined && eq(carListing.make, make))
        // .where(price != undefined, eq(carListing.sellingPrice, price))

        const resp = Service.FormatResult(result)
        console.log(resp)
        setCarList(resp)
    }
  return (
    <div>
    <Navbar/>

    <div className='p-10 bg-black flex justify-center'>
        <Search/>
    </div>
    <div className='p-10 md:px-20'>
      <h2 className='font-bold text-4xl'>Search Result</h2>

      {/* list of carlist */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-5 mt-7'>
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

export default SearchByOptions