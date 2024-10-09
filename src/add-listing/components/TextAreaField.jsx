import React from 'react'
import { Textarea } from "@/components/ui/textarea"

const TextAreaField = ({item, handleInputChange, carInfo}) => {
  return (
    <div>
    <Textarea onChange={(e) => handleInputChange(item.name, e.target.value)} required={item.required} defaultValue={carInfo?.[0][item.name]} />
    </div>
  )
}

export default TextAreaField