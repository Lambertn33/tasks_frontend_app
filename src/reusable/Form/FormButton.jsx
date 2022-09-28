import React from 'react'

export default function FormButton({className, title}) {
  return (
    <button type="submit" className={className}>{title}</button>
  )
}
