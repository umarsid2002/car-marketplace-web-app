import React, {useState, useEffect} from 'react'
import FakeData from '@/shared/FakeData'
import CarItem from './CarItem'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { db } from './../../configs'
import { CarImages, carListing } from './../../configs/schema'
import { desc, eq } from 'drizzle-orm'
import Service from '@/shared/Service'

const MostSearchedCar = () => {

  const [carList, setCarList] = useState([])
  useEffect(() => {
    GetPopularCarList()
  }, [])
  

    const GetPopularCarList = async () => {
      const result = await db.select().from(carListing)
        .leftJoin(CarImages, eq(carListing.id, CarImages.carListingId))
        .orderBy(desc(carListing.id))
        .limit(10)

        const resp = Service.FormatResult(result)
        console.log(resp)
        setCarList(resp)
    }
  return (
    <div className='mx-12'>
        <h2 className='font-bold text-3xl text-center mt-16 mb-7'>Most Searched Car</h2>

        <Carousel className="w-full">
  <CarouselContent>
  {carList.map((car, index)=>{
            return <CarouselItem key={index} className='xl:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-full'>
                <CarItem car={car} key={index} />
            </CarouselItem>
        })}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>


    </div>
  )
}

export default MostSearchedCar