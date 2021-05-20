import api from '../utils/api'
import { toast } from 'react-toastify'

// pegar todos os clients
export const getClientById = (id) => async dispatch => {
    console.log('action id', id)
    try {
        dispatch({
            type: 'LOADING'
        })
        const res = await api.get(`/client/${id}`);
      
        dispatch({
            type: 'GET_CLIENT',
            payload: { client: res.data }
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}


// pegar todos os clients
export const getClients = () => async dispatch => {
    try {
      
        const res = await api.get('/client');
      
        dispatch({
            type: 'GET_CLIENTS',
            payload: { clients: res.data }
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}

// adicionar item ao estoque
export const addClient = (data) => async dispatch => {
    try {
        const res = await api.post('/client', data);
       console.log('client res data', res.data)
        dispatch({
            type: 'ADD_CLIENT',
            payload: res.data
        })

        toast.dark('✔️  Cliente cadastrado com sucesso', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}

// remover client
export const removeClient = (id) => async dispatch => {
    try {
        dispatch({
            type: 'REMOVE_CLIENT',
            payload: { id }
        })
         await api.delete(`/client/${id}`);
 
      
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}

// editar client
export const editClient = (id, data) => async dispatch => {
    try {
         const res = await api.put(`/client/${id}`, data);
 
        dispatch({
            type: 'EDIT_CLIENT',
            payload: { id, client: res.data }
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}