import React, {useState} from 'react'
import Wrapper from '../Wrapper'
import Swal from "sweetalert2"

import {useQuery, useMutation, useQueryClient} from 'react-query'
import * as tasksService from '../../../services/tasksService'
import TasksList from './TasksList';
import SearchForm from '../search/SearchForm'

export default function Index() {
  const [initialTasks, setInitialTasks] = useState([]);
  const [initialProjects, setInitialProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [taskId, setTaskId] = useState('');
  const queryClient = useQueryClient();

  const {isLoading:isFetchingData, isError} = useQuery('tasks', tasksService.getAllData, {
    onSuccess: (data) => {
      const {tasks, projects} = data.initialData;
      setInitialTasks(tasks);
      setInitialProjects(projects);
    }
  });

  const {isLoading:  isDeletingTask, mutate: deleteTask } = useMutation(
      async () => {
        const response = await tasksService.deleteTask(taskId);
        if (response.status === 200) {
          setIsDeleting(false);
          showAlert("Success", response.message, "success");
        } 
      },
      {
        onSuccess: res => {
          queryClient.invalidateQueries('tasks');
        }
      }
  );


  const handleDelete = async(task) => {
    setTaskId(task.id);
    setIsDeleting(true);
    setTimeout(()=>{
      deleteTask();
    }, 2000)
  }

  const showAlert = (title, text, icon) => {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
    });
  }
  

  const onCheck = (e) => {
    if (e.target.checked) {
      setSelectedProject(e.target.value);
      const filteredData = initialTasks.filter((item) => item.project_id === e.target.value);
      setFilteredTasks(filteredData);
    } else {
      setFilteredTasks([]);
      setSelectedProject('');
    }
  }

  return (
    <Wrapper>
       <h2 className='text-center'>Tasks List</h2>
       {
        isFetchingData ?
        <div className='d-flex justify-content-center pt-4'>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>  
        :
        isError ?
        <div className='alert alert-danger text-center mt-4'>
             <b>An Error occured...please try again</b>
        </div>
        :
        initialTasks.length > 0 ?
          <>
             <SearchForm
              projects={initialProjects}
              checkedValue={selectedProject}
              onCheck={onCheck}  />

             <TasksList
              selectedProject={selectedProject}
              fetchedTasks={initialTasks}
              filteredTasks={filteredTasks}
              handleDelete={handleDelete}
              isDeleting={isDeleting}
              taskId={taskId} />
          </>
        : <div className='alert alert-info text-center'><b>No Tasks Available Now...</b></div>
       }
    </Wrapper>
  )
}
