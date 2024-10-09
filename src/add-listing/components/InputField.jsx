import { Input } from '@/components/ui/input'
import React from 'react'

const InputField = ({item, handleInputChange, carInfo}) => {
  console.log(carInfo)
  return (
    <div>
        <Input type={item.fieldType} defaultValue={carInfo?.[0][item?.name]} name={item?.name} required={item.required} onChange={(e)=>handleInputChange(item.name,e.target.value)} />
    </div>
  )
}

export default InputField