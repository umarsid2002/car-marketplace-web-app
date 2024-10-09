import Data from '@/shared/Data'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Category = () => {
  return (
    <div className='mt-40'>
        <h2 className='font-bold text-3xl text-center mb-6'>Browse By Type</h2>

        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20'>
            {Data.category.map((category,index)=>{
                return <Link to={'search/' + category.name}>
                <div className='border rounded-xl p-3 flex flex-col items-center hover:shadow-md cursor-pointer'>
                    <img src={category.icon} alt="" width={35} height={35} />
                    <h2 className='mt-2'>{category.name}</h2>
                </div>
                </Link>
            })}
        </div>
    </div>
  )
}

export default Category