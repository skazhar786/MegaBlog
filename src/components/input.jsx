
import React from 'react'

const input = React.forwardRef(({
    label,
    type = "text",
    className= "",
    ...props
    
},ref)=>{

      return (
    <div>
      {label && <label
      className='inline-block mb-1 pl-1'>
        {label}
        </label>
        }
        <input
        type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}>
        </input>
        
    </div>
  )

})



export default input
