import { Button } from '@/components/ui/button';
import { storage } from './../../../configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState, useEffect } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { db } from './../../../configs';
import { CarImages } from './../../../configs/schema';
import { eq } from 'drizzle-orm';

const UploadImages = ({triggerUploadImages, setLoader, carInfo, mode}) => {

    const [selectedFiles, setSelectedFiles] = useState([])
    const [editCarImageList, setEditCarImageList] = useState([])

    
    useEffect(() => {
        if(triggerUploadImages){
            uploadImageToServer()
        }
        
    }, [triggerUploadImages])
    
    useEffect(() => {
        if(mode == 'edit'){
            // console.log(mode)
        carInfo?.[0].images.forEach((image)=>{
            setEditCarImageList(prev=>[...prev,image?.imageUrl])
            // console.log(image)
        })
      }
    },[carInfo,mode])

    const onFileSelected = (event) => {
        const files = event.target.files

        for (let i=0; i < files.length; i++) {
            const file = files[i]

            setSelectedFiles((prev)=>[...prev, file])
            // const objectUrl = URL.createObjectURL(file)
        }
    }

const onImageRemove = (image,index) => {
    const result = selectedFiles.filter((item)=>item!=image)
    setSelectedFiles(result)
}

const onImageRemoveFromDB = async (image,index) => {
    const result = await db.delete(CarImages).where(eq(CarImages.id, carInfo?.[0].images[index]?.id)).returning({id: CarImages.id})
    const imageList = editCarImageList.filter(item=>item!=image)
    setEditCarImageList(imageList)
}

const uploadImageToServer = () => {
    // setLoader(true)
    selectedFiles.forEach((file)=>{
        const fileName = Date.now() + '.jpeg';
        const storageRef = ref(storage, 'image/' + fileName)
        const metaData={
            contentType: 'image/jpeg'
        }
        uploadBytes(storageRef, file, metaData).then((snapshot)=> {
            console.log('uploaded file')
        }).then((resp)=>{
            getDownloadURL(storageRef).then(async(downloadUrl)=>{
                console.log(downloadUrl)
                await db.insert(CarImages).values({
                    imageUrl: downloadUrl,
                    carListingId: triggerUploadImages
                })
            })
        })
        // setLoader(false)
    })
}

  return (
    <div>
        <h2 className='font-medium text-xl my-3'>Upload Car Images</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 text-center gap-5'>

            {mode == 'edit' &&
            editCarImageList.map((image,index)=>(
                <div key={index}>
                    <IoMdCloseCircle className='absolute m-2 text-lg text-white' onClick={()=>onImageRemoveFromDB(image,index)} />
                    <img src={image} className='w-full h-[130px] object-cover rounded-xl' alt="" />
                </div>
            ))
            }

            {selectedFiles.map((image,index)=>(
                <div key={index}>
                    <IoMdCloseCircle className='absolute m-2 text-lg text-white' onClick={()=>onImageRemove(image,index)} />
                    <img src={URL.createObjectURL(image)} className='w-full h-[130px] object-cover rounded-xl' alt="" />
                </div>
            ))}

            <label htmlFor='upload-images'>
                <div className='border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md'>
                    <h2 className='text-2xl font-semibold text-primary'>+</h2>
                </div>
            </label>
            <input type="file" onChange={onFileSelected} multiple={true} id='upload-images' className='opacity-0' />
        </div>
        <Button onClick={uploadImageToServer}>Upload Images</Button>
    </div>
  )
}

export default UploadImages