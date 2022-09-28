import React from 'react'
import FormButton from '../../../reusable/Form/FormButton'
import FormInput from '../../../reusable/Form/FormInput'
import FormSelect from '../../../reusable/Form/FormSelect'
import './create.css'

export default function CreateForm({form, setName, setProject, projects, onSubmit, isSaving}) {
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={onSubmit}>
                <FormInput
                  label='Task Name'
                  type='text'
                  value={form.name}
                  onChange={setName}
                />
                <FormSelect
                  projects={projects}
                  onChange={setProject}
                  value={form.project}
                />
                <br />
                <FormButton
                  title={!isSaving ? 'Save New Task' : 'Please wait...'}
                  className='btn btn-primary'
                />
              </form>
            </div>
        </div>
    </div>
  )
}
