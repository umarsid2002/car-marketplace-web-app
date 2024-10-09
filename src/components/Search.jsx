import React, {useState} from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { CiSearch } from "react-icons/ci";
import { Separator } from "@/components/ui/separator"
import { data } from 'autoprefixer';
import Data from '@/shared/Data';
import { Link } from 'react-router-dom';

  

const Search = () => {

  const [cars, setCars] = useState()
  const [make, setMake] = useState()
  const [price, setPrice] = useState()

  return (
    <div className='p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 space-y-4 sm:space-y-0 items-center sm:w-[60%] w-full py-5'>
        <Select onValueChange={(value) => setCars(value)}>
            <SelectTrigger className="outline-none md:border-none shadow-none w-full text-lg py-5">
                <SelectValue placeholder="Cars" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Old">Old</SelectItem>
                <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
            </SelectContent>
        </Select>
        <Separator orientation="vertical" className='hidden sm:block' />

        <Select onValueChange={(value) => setMake(value)}>
        <SelectTrigger className="outline-none md:border-none shadow-none w-full text-lg py-5">
                <SelectValue placeholder="Car Makes" />
            </SelectTrigger>
            <SelectContent>
                {Data.carMakes.map((maker, index)=>{
                  return <SelectItem value={maker.name}>{maker.name}</SelectItem>
                })}
            </SelectContent>
        </Select>
        <Separator orientation="vertical" className='hidden sm:block' />

        <Select onValueChange={(value) => setPrice(value)}>
            <SelectTrigger className="outline-none md:border-none shadow-none w-full text-lg py-5">
                <SelectValue placeholder="Pricing" />
            </SelectTrigger>
            <SelectContent>
                {Data.Pricing.map((price, index)=>{
                  return <SelectItem key={index} value={price.amount}>{price.amount}</SelectItem>
                })}
            </SelectContent>
        </Select>
        <Link to={'/search?cars='+ cars + '&make=' + make + '&price=' + price}>
        <CiSearch className='text-[50px] bg-primary text-white rounded-full p-3 hover:scale-105 transition-all cursor-pointer sm:mt-0 mt-5'/>
        </Link>
    </div>
  )
}

export default Search