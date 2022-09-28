import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './tasks.css'

export default function TasksList({fetchedTasks,selectedProject, filteredTasks, handleDelete, isDeleting, taskId}) {
const [row, setRow] = useState('');
const dragStart = (e) => {
    setRow(e.target);
}

const dragOver = (e) => {
  e.preventDefault();
  let children= Array.from(e.target.parentNode.parentNode.children);
  if(children.indexOf(e.target.parentNode)>children.indexOf(row)) {
      e.target.parentNode.after(row);
  } else {
      e.target.parentNode.before(row);
  }
}

const tableData = (data) => {
    return (
        data.map(task => {
            return (
                <tr key={task.id}
                draggable={true}
                onDragStart={dragStart}
                onDragOver={dragOver}
                >
                    <td>{task.name}</td>
                    <td>{task.project.name}</td>
                    <td>{task.priority}</td>
                    <td className='actions'>
                        <Link to={`/${task.id}`}>
                            <a className='btn btn-info'>Edit</a>
                        </Link>
                        <button onClick={()=>handleDelete(task)} className='btn btn-danger'>{(isDeleting && taskId === task.id) ? 'Please wait..' : 'Delete'}</button>
                    </td>
                </tr>
            );
        })
    )
}
  return (
    <table className="table table-bordered mt-4">
        <thead>
            <tr>
                <th scope="col">Task Name</th>
                <th scope="col">Project</th>
                <th scope="col">Task Priority</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {
                selectedProject === "" ?
                tableData(fetchedTasks)
                :
                 tableData(filteredTasks)
            }
        </tbody>
    </table>
  )
}
