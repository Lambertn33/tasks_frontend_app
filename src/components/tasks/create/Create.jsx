import React, {useState} from 'react'
import Wrapper from '../Wrapper'
import {useMutation, useQuery, useQueryClient} from 'react-query';
import Swal from "sweetalert2";
import CreateForm from './CreateForm';
import tasksService, * as taskServices from '../../../services/tasksService'

export default function Create() {
  const [initialProjects, setInitialProjects] = useState([]);
  const [form, setForm] = useState({name: '', project: ''});
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const {isLoading: isCreatingTask, isError: isTaskCreatingError, mutate: createTask} = useMutation(
    async ()=> {
      const response = await tasksService.createNewTask(form);
      if (response.status ===201) {
        showAlert("Success", response.message, "success").then(function() {
          window.location.href = "/";
        });        
      } else {
        setIsSaving(false);
        showAlert("Error", response.message, "error");
      }
    },
    {
      onSuccess: res => {
        queryClient.invalidateQueries('tasks');
      }
    }
  );

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSaving(true);
    createTask();
  }
  const {isLoading, isError} = useQuery('projects', taskServices.getAllData, {
    onSuccess: (data) => {
      const {projects} = data.initialData;
      setInitialProjects(projects);
    }
  });

  const showAlert = (title, text, icon) => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
    });
  }

  const setName = (e) => {
    setForm({...form, name:e.target.value});
  }
  const setProject = (e) => {
    setForm({...form, project:e.target.value});
  }
  return (
    <Wrapper>
      <h2 className='text-center'>Create New Task</h2>
      {
        isLoading &&
          <div className='d-flex justify-content-center pt-4'>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>          
      }
      {
        isError &&
          <div className='alert alert-danger text-center mt-4'>
             <b>An Error occured...please try again</b>
          </div>        
      }
      {
        initialProjects &&
         <CreateForm
         form={form}
         onSubmit={handleSubmit}
         setName = {setName} setProject = {setProject} projects={initialProjects}  isSaving={isSaving} />
      }
  
    </Wrapper>
  )
}
