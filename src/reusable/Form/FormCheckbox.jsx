import React from 'react'

export default function FormCheckbox({project, onCheck, checkedValue}) {
  return (
    <div className="form-check form-check-inline">
    <input
     onChange={onCheck}
     className="form-check-input"
     checked={checkedValue === project.id ? true : false}
     type="checkbox"
     value={project.id}
     id={project.id} />

    <label className="form-check-label" htmlFor={project.id}>
       {project.name}
    </label>
    </div>
  )
}
