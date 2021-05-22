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
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}

export const getClientByIdHistory = (id) => async dispatch => {
    console.log('action id', id)
    try {
        dispatch({
            type: 'LOADING'
        })
        const res = await api.get(`/client/${id}`);
      
        dispatch({
            type: 'GET_CLIENT_HISTORY',
            payload: res.data
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

// procurar e pegar clientes por nome
export const findNameClient = (name) => async dispatch => {
    try {
        const res = await api.post(`/client/query`, { name });
   
        dispatch({
            type: 'CLIENT_QUERY',
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'CLIENT_ERROR'
        })
        
    }
}

// adicionar venda ao histórico do cliente
export const addHistorySale = (client, sale) => async dispatch => {
    try {
        await api.post(`/client/history/${client._id}`, sale);
   
        dispatch({
            type: 'CLIENT_ADD_HISTORY',
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'CLIENT_ERROR'
        })
        
    }
}
// pegar historico do client
export const getClientHistory = (client_id) => async dispatch => {

    try {
        dispatch({
            type: 'LOADING'
        })
        const res = await api.get(`/client/history/${client_id}`);
      
        dispatch({
            type: 'CLIENT_GET_HISTORY',
            payload: { history: res.data, client_id }
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}


// remover historico de compra do cliente
export const removeClientHistory = (client_id, history_id) => async dispatch => {
    try {
        console.log('actonh istory id', history_id)
        dispatch({
            type: 'CLIENT_REMOVE_HISTORY',
            payload: { client_id, history_id }
        })
         await api.delete(`/client/history/${client_id}/${history_id}`);
 
      
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}
