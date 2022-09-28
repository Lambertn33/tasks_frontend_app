import React from 'react'

export default function FormEditSelect({projects, onChange, task}) {;
  return (
    <select className="form-select" onChange={onChange} >
        {projects.map(project => {
          return (
            <option selected={project.id === task.project_id} value={project.id} key={project.id}>{project.name}</option>
          )
        })}
    </select>
  )
}
