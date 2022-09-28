import axios from 'axios';

const endpoint = 'http://127.0.0.1:8000/api/tasks';

export async function getAllData() {
    const response = await axios.get(`${endpoint}`);
    return await response.data;
}

export async function createNewTask({name, project}) {
    const response = await axios.post(`${endpoint}/create`,{name, project});
    return await response.data;
}

export async function getTask(id) {
    const response = await axios.get(`${endpoint}/${id}`);
    return await response.data;
}

export async function updateTask({name, project}, id) {
    const response = await axios.put(`${endpoint}/${id}`,{name, project});
    return await response.data;
}

export async function deleteTask(id) {
    const response = await axios.get(`${endpoint}/${id}/delete`);
    return await response.data;
}


export default {
    getAllData,
    createNewTask,
    getTask,
    deleteTask,
    updateTask
}