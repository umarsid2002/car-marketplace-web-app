import React from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStickPattern } from "react-icons/gi";
import { MdLocalGasStation } from "react-icons/md";



const DetailHeader = ({ carDetail }) => {
    return (
        <div>
            {carDetail?.listingTitle ? 
        <div>
            <h2 className='font-bold text-3xl'>{carDetail?.listingTitle}</h2>
            <p className='font-bold text-sm'>{carDetail?.tagline}</p>

            <div className='flex gap-2 mt-8'>
                <div className='flex gap-2 items-center bg-blue-50 bg-blue-50 rounded-full p-2 px-3'>
                    <FaRegCalendarAlt className='h-7 w-7 text-primary' />
                    <h2 className='text-primary text-sm'>{carDetail?.year}</h2>
                </div>
                <div className='flex gap-2 items-center bg-blue-50 bg-blue-50 rounded-full p-2 px-3'>
                    <IoSpeedometerOutline className='h-7 w-7 text-primary' />
                    <h2 className='text-primary text-sm'>{carDetail?.mileage}</h2>
                </div>
                <div className='flex gap-2 items-center bg-blue-50 bg-blue-50 rounded-full p-2 px-3'>
                    <GiGearStickPattern className='h-7 w-7 text-primary' />
                    <h2 className='text-primary text-sm'>{carDetail?.transmission}</h2>
                </div>
                <div className='flex gap-2 items-center bg-blue-50 bg-blue-50 rounded-full p-2 px-3'>
                    <MdLocalGasStation className='h-7 w-7 text-primary' />
                    <h2 className='text-primary text-sm'>{carDetail?.fuelType}</h2>
                </div>
            </div>
        </div>
:
        <div className='w-full rounded-xl h-[100px] bg-slate-200 animate-pulse'>

        </div>
        }
        </div>
    )
}

export default DetailHeader