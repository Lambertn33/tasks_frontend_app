import React from 'react'

export default function FormInput({label, onChange, type, ...other}) {
  return (
    <div className="mb-3">
        <label  className="form-label">{label}</label>
        <input type={type} className="form-control" onChange={onChange} {...other} />
    </div>
  )
}
