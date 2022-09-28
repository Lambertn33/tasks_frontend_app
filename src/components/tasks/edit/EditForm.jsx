import React from 'react'
import FormButton from '../../../reusable/Form/FormButton'
import FormInput from '../../../reusable/Form/FormInput'
import FormEditSelect from '../../../reusable/Form/FormEditSelect'
import '../create/create.css'

export default function EditForm({form, setName, setProject, projects, handleUpdate, task, isUpdating}) {
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleUpdate}>
                <FormInput
                  label='Task Name'
                  type='text'
                  defaultValue={task.name}
                  onChange={setName}
                />
                <FormEditSelect
                  projects={projects}
                  onChange={setProject}
                  value={form.project}
                  task={task}
                />
                <br />
                <FormButton
                  title={!isUpdating ? 'Update Task' : 'Please wait...'}
                  className='btn btn-success'
                />
              </form>
            </div>
        </div>
    </div>
  )
}
