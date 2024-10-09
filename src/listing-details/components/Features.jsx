import React from 'react'
import { FaCheck } from "react-icons/fa6";


const Features = ({features}) => {
    // console.log(features)
  return (
    <div className='p-10 rounded-xl border shadow-md my-7'>
        <h2 className='font-medium text-2xl'>Features</h2>
        
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-8'>
          {
            features != undefined && 
            Object.entries(features).map(([feature, value])=>{
              return <div className='flex gap-2 items-center'>
                <FaCheck className='text-lg p-1 rounded-full bg-blue-100 text-primary' />
                <h2>{feature}</h2>
               </div>
            })
          }
        </div>
    </div>
  )
}

export default Features