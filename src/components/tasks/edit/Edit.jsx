import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import * as tasksService from '../../../services/tasksService';
import Wrapper from '../Wrapper';
import Swal from 'sweetalert2';

import {useQuery, useMutation, useQueryClient} from 'react-query'
import EditForm from './EditForm';
export default function Edit() {
  const [task, setTask] = useState({});
  const [form, setForm] = useState({name: '', project: ''});
  const [initialProjects, setInitialProjects] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const { taskId } = useParams();
  const queryClient = useQueryClient();

  const {isLoading, isError:isProjectsError} = useQuery('projects', tasksService.getAllData, {
    onSuccess: (data) => {
      const {projects} = data.initialData;
      setInitialProjects(projects);
    }
  });

  const {isLoading: isFetchingSingleTask, isError} = useQuery(['task', taskId], ()=>tasksService.getTask(taskId), {
    onSuccess: (data) => {
     const {task} = data;
     setTask(task);
    }
  });


  const {isLoading: isUpdatingTask, isError: isTaskUpdatingError, mutate: updateTask} = useMutation(
    async ()=> {
      const response = await tasksService.updateTask(form, taskId)
      if (response.status ===200) {
        showAlert("Success", response.message, "success").then(function() {
          window.location.href = "/";
        });        
      } else {
        setIsUpdating(false);
        showAlert("Error", response.message, "error");
      }
    },
    {
      onSuccess: res => {
        queryClient.invalidateQueries('tasks');
      }
    }
  ); 

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

  const handleUpdate = async(e) => {
    e.preventDefault();
    setIsUpdating(true);
    updateTask();
  }

  return (
    <Wrapper>
       <h2 className='text-center'>Edit Task</h2>
       {
        isFetchingSingleTask &&
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
        task && <EditForm form={form} isUpdating={isUpdating} handleUpdate={handleUpdate} task={task} projects={initialProjects} setName = {setName} setProject = {setProject}/>
      }
    </Wrapper>
  )
}
