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
        toast.success('✔️  Compra registrada com sucesso, estoque atualizado', {
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



