import Navbar from '@/components/Navbar'
import React, {useEffect, useState} from 'react'
import DetailHeader from '../components/DetailHeader'
import { useParams } from 'react-router-dom'
import { db } from './../../../configs'
import { CarImages, carListing } from './../../../configs/schema'
import { eq } from 'drizzle-orm'
import Service from '@/shared/Service'
import ImageGallery from '../components/ImageGallery'
import Description from '../components/Description'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import Specification from '../components/Specification'
import OwnersDetail from '../components/OwnersDetail'
import FinancialCalculator from '../components/FinancialCalculator'
import MostSearchedCar from '@/components/MostSearchedCar'

const ListingDetail = () => {
    const {id} = useParams()
    const [carDetail, setCarDetail] = useState()
    
    useEffect(() => {
      GetCarDetail()
    }, [])
    

    const GetCarDetail = async() => {
        const result = await db.select().from(carListing)
        .innerJoin(CarImages, eq(carListing.id, CarImages.carListingId))
        .where(eq(carListing.id, id))

        const resp = Service.FormatResult(result)
        setCarDetail(resp[0])
    }
  return (
    <div>
        <Navbar/>


        <div className='p-10 md:px-20'>
            <DetailHeader carDetail={carDetail} />
        

        <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
            
            {/* Left */}
            <div className='grid md:col-span-2 content-start'>
                {/* Image Gallery */}
                <ImageGallery carDetail={carDetail} />

                {/* Description */}
                <Description carDetail={carDetail} />

                {/* Features List */}
                <Features features={carDetail?.features} />

                {/* Financial Calculator */}
                <FinancialCalculator carDetail={carDetail} />
                
            </div>

            {/* right */}
            <div>
                {/* Pricing */}
                <Pricing carDetail={carDetail} />

                {/* Car Specification */}
                <Specification carDetail={carDetail} />

                {/* Owners Detail */}
                <OwnersDetail carDetail={carDetail} />

            </div>
            </div>

            <MostSearchedCar/>
        </div>
    </div>
  )
}

export default ListingDetail