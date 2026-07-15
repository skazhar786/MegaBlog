import React from 'react'

function Button  (
   { children,
    type = "button",
    bgColor  = "bg-color-blue",
    textColor = "text-white",
    className = "",
    ...props
})  {
    return (
        <button className={`py-2 px-4 round-lg bg-blue-700 hover:bg-blue-600 cursor-pointer  rounded-2xl text-white font-bold text-xl ${bgColor} ${textColor}, ${className}`}{...props}>
   {children}</button>
  )
}

export default Button


