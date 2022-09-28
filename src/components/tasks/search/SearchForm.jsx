import React from 'react'
import FormCheckbox from '../../../reusable/Form/FormCheckbox'
import FormSelect from '../../../reusable/Form/FormSelect'

export default function SearchForm({projects, onCheck, checkedValue}) {
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-6">
                <h6>Filter Tasks By Project</h6>
                {
                    projects.map(project => {
                        return <FormCheckbox
                                key={project.id} 
                                project={project}
                                onCheck={onCheck}
                                checkedValue={checkedValue}
                                />
                    })
                }
            </div>
        </div>
    </div>
  )
}
