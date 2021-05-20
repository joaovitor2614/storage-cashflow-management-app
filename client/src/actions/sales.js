import api from "../utils/api";
import { toast } from 'react-toastify'
import { removeItem, updateStorage } from "./storage";




// adicionar item ao estoque
export const addSale = (data) => async dispatch => {
    try {
        const res = await api.post('/sales', data);
        
        dispatch({
            type: 'ADD_SALE'
        })
        // atualizar estoque após registro de comprar
        dispatch(updateStorage(data.products))
        toast.default('✔️  Compra registrada com sucesso, estoque atualizado', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'SALES_ERROR'
        })
        
    }
}

// pegar vendas diárias e mensais
export const getSales = () => async dispatch => {
    try {
        const res = await api.get('/sales');
        
        dispatch({
            type: 'GET_SALES',
            payload: { dailySales: res.data.dailySales, monthlySales: res.data.monthlySales }
        })
    
 
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'SALES_ERROR'
        })
        
    }
}



// excluir venda
export const removeSale = (id) => async dispatch => {
    try {
        console.log('id', id)
        dispatch({
            type: 'REMOVE_SALE',
            payload: { id }
        })
        const res = await api.delete(`/sales/${id}`);
        console.log(res)
        
     
       
    } catch (err) {
        console.log(err)
        console.log(err.message)
        dispatch({
            type: 'SALES_ERROR'
        })
        
    }
}

// editar venda
export const editSale = (id, product_id, data) => async dispatch => {
    try {
      
    
        const res = await api.put(`/sales/${id}/${product_id}`, data);
        console.log(res)
        
     
       
    } catch (err) {
        console.log(err)
        console.log(err.message)
        dispatch({
            type: 'SALES_ERROR'
        })
        
    }
}