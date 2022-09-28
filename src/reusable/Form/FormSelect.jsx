import React from 'react'

export default function FormSelect({projects, value, onChange, task}) {
  return (
    <select className="form-select"  onChange={onChange} >
        <option selected disabled>Select A Project</option>
        {projects.map(project => {
          return (
            <option value={project.id} key={project.id}>{project.name}</option>
          )
        })}
    </select>
  )
}
