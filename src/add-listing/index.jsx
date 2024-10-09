import Navbar from '@/components/Navbar'
import React, { useState, useEffect } from 'react'
import CarDetails from '@/shared/CarDetails.json'
import InputField from './components/InputField'
import DropdownFields from './components/DropdownFields'
import TextAreaField from './components/TextAreaField'
import { Separator } from '@/components/ui/separator'
import features from "@/shared/Features.json"
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { db } from './../../configs/index'
import { CarImages, carListing } from './../../configs/schema'
import IconField from './components/IconField'
import UploadImages from './components/UploadImages'
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "sonner"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import moment from 'moment'
import { eq } from 'drizzle-orm'
import Service from '@/shared/Service'

const Addlisting = () => {

  const [formData, setFormData] = useState([])
  const [featuresData, setFeaturesData] = useState([])
  const [triggerUploadImages, setTriggerUploadImages] = useState()
  const [loader, setLoader] = useState(false)
  const [searchParams] = useSearchParams()
  const [carInfo, setCarInfo] = useState()
  const navigate = useNavigate()
  const {user} = useUser()

  const mode = searchParams.get('mode')
  const recordId = searchParams.get('id')

  useEffect(() => {
    if (mode == 'edit') {
      GetListingDetail()
    }
  }, [mode])

  const GetListingDetail = async () => {
    const result = await db.select().from(carListing)
    .innerJoin(CarImages, eq(carListing.id, CarImages.carListingId))
    .where(eq(carListing.id, recordId))

    const resp = Service.FormatResult(result)

    setCarInfo(resp)
    setFeaturesData(resp[0].features)
    setFormData(resp[0])
    console.log(resp)
  }
  

  const handleInputChange = (name,value) => {
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))

  }

  // For saving Features Data
  const handleFeaturedChange = (name, value) => {
    setFeaturesData((prevData)=>({
      ...prevData,
      [name]:value
    }))

    console.log(featuresData)
  }

  
  const onSubmit = async(e) =>{
    setLoader(true)
    e.preventDefault();
    console.log(formData)
    toast('Please Wait')

    if(mode == 'edit') {
      const result = await db.update(carListing).set({
        ...formData,
        features:featuresData,
        createdBy: user.primaryEmailAddress.emailAddress,
        userName: user?.fullName,
        userImageUrl: user?.imageUrl,
        postedOn: moment().format('DD/MM/YYYY')
      }).where(eq(carListing.id, recordId)).returning({id: carListing.id})
      console.log(result)
      navigate('/profile')
      setLoader(false)
    }
    else
    {

    }
    try {
      
      const result = await db.insert(carListing).values({
        ...formData,
        features:featuresData,
        createdBy: user.primaryEmailAddress.emailAddress,
        userName: user?.fullName,
        userImageUrl: user?.imageUrl,
        postedOn: moment().format('DD/MM/YYYY')

      }).returning({id:carListing.id})
      if(result){
        console.log("Data Saved")
        setLoader(false)
        setTriggerUploadImages(result[0].id)
      }
    } catch (error) {
      setLoader(false)
      console.log("Error: ", error)
    }

  }


  return (
    <div>
        <Navbar/>
        <div className='px-10 md:px-20 my-10'>
            <h2 className='font-bold text-4xl'>Add New Listing</h2>
            <form className='p-10 border rounded-xl mt-2'>
              {/* Car Details */}
              <div>
                <h2 className='font-medium text-xl mb-6'>Car Details</h2>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-5'>
                  {CarDetails.carDetails.map((item, index)=>{
                    return <div key={index}>
                      <label className='text-sm flex gap-2 items-center mb-2'>
                        <IconField icon={item.icon} />
                        {item.label} {item.required && <span className='text-red-500'>*</span>}</label>
                      {item.fieldType == 'text' || item.fieldType == 'number' ? <InputField item={item} carInfo={carInfo} handleInputChange={handleInputChange}/> : item.fieldType == 'dropdown' ? <DropdownFields handleInputChange={handleInputChange} dropdownItems={item} carInfo={carInfo} /> : item.fieldType == 'textarea' && <TextAreaField handleInputChange={handleInputChange} item={item} carInfo={carInfo}/>}
                            </div>
                  })}
                </div>
              </div>
              <Separator className='my-6'/>
              {/* Feature List */}
              <div>
                <h2 className='font-medium text-xl my-6'>Features</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                  {features.features.map((item,index)=>{
                    return <div key={index} className='flex gap-2 items-center'>
                    <Checkbox onCheckedChange={(value)=>handleFeaturedChange(item.name,value)} checked={featuresData?.[item.name]} /> <h2>{item.label}</h2>
                    </div>
                  })}
                </div>
              </div>

              {/* Car Images */}
              <Separator className='my-6'/>
              <UploadImages triggerUploadImages={triggerUploadImages} mode={mode} carInfo={carInfo} setLoader={(v)=>{setLoader(v)}} />
              <div className='mt-10 flex justify-end'>
                <Button onClick={(e)=>onSubmit(e)} disabled={loader}>{loader ? <BiLoaderAlt className='animate-spin text-xl' /> : 'Submit'}</Button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Addlisting