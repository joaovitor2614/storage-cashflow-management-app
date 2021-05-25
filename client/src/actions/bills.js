import api from '../utils/api'
import { toast } from 'react-toastify'

// pegar todos os clients
export const getBillById = (id) => async dispatch => {
   
    try {
        dispatch({
            type: 'LOADING_BILL'
        })
        const res = await api.get(`/receipt/${id}`);
      
        dispatch({
            type: 'GET_BILL',
            payload: { bill: res.data }
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'BILL_ERROR'
        })
        
    }
}


// pegar todos os clients
export const getBills = () => async dispatch => {
    try {
        dispatch({ type: 'LOADING_BILL'})
        const res = await api.get('/receipt');
      
        dispatch({
            type: 'GET_BILLS',
            payload: { paid: res.data.paid, notPaid: res.data.notPaid }
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'BILL_ERROR'
        })
        
    }
}

// adicionar item ao estoque
export const addBill = (data) => async dispatch => {
    try {
        const res = await api.post('/receipt', data);
       console.log('bill res data', res.data)
        dispatch({
            type: 'ADD_BILL',
            payload: res.data
        })

        toast.dark('✔️ Conta a pagar adicionada', {
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
            type: 'BILL_ERROR'
        })
        
    }
}

// remover bill
export const removeBill = (id, isPaid) => async dispatch => {
    try {
        if (isPaid === false) {
            dispatch({
                type: 'REMOVE_BILL',
                payload: { id }
            })
        } else if (isPaid === true) {
            dispatch({
                type: 'REMOVE_BILL_HISTORY',
                payload: { id }
            })
        }
        
         await api.delete(`/receipt/${id}`);
 
      
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'BILL_ERROR'
        })
        
    }
}

// editar client
export const editBill = (id, data) => async dispatch => {
    try {
         const res = await api.put(`/receipt/${id}`, data);
        if (data.isPaid === false) {
            dispatch({
                type: 'EDIT_BILL',
                payload: { id, bill: res.data }
            })
        } else if (data.isPaid === true) {
            dispatch({
                type: 'EDIT_BILL_HISTORY',
                payload: { id, bill: res.data }
            })
        }
       
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'BILL_ERROR'
        })
        
    }
}

// colocar conta como pagar
export const payBill = (id, bill) => async dispatch => {
    try {
         await api.put(`/receipt/paid/${id}`);
         bill.isPaid = true
        dispatch({
            type: 'PAY_BILL',
            payload: { id, bill }
        })
        toast.dark('✔️ Conta registrada como paga e salva em histórico', {
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
            type: 'BILL_ERROR'
        })
        
    }
}