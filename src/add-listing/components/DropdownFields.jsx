import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const DropdownFields = ({dropdownItems, handleInputChange, carInfo}) => {
  // console.log(carInfo?.[0][dropdownItems.name])
  return (
    <div>
        <Select onValueChange={(value)=>handleInputChange(dropdownItems.name, value)} required={dropdownItems.required}
        
          >
        <SelectTrigger className="w-full">
            <SelectValue placeholder={carInfo?.[0][dropdownItems.name] ? carInfo?.[0][dropdownItems.name] : dropdownItems.label} />
        </SelectTrigger>
        <SelectContent>
            {dropdownItems.options.map((item,index)=>{
                return <SelectItem key={index} value={item}>{item}</SelectItem>
            })}
        </SelectContent>
        </Select>

    </div>
  )
}

export default DropdownFields