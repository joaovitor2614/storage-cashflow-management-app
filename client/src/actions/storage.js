import api from '../utils/api'





// pegar todos os items do estoque
export const getItems = () => async dispatch => {
    try {
        const res = await api.get('/item');
        dispatch({
            type: 'GET_ITEMS',
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}

// adicionar item ao estoque
export const addItem = (data) => async dispatch => {
    try {
        const res = await api.post('/item', data);
 
        dispatch({
            type: 'GET_ITEM',
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}

// editar item 
export const editItem = (data, id) => async dispatch => {
    try {
        const res = await api.post(`/item/edit/${id}`, data);
  
        dispatch({
            type: 'EDIT_ITEM',
            payload: { item: res.data, item_id: id }
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}

// excluir item do estoque
export const removeItem = (id) => async dispatch => {
    try {
        const res = await api.delete(`/item` + `/${id}`);
        
       
        dispatch({
            type: 'REMOVE_ITEM',
            payload: { item_id: id }
        })
        
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}

// procurar e pegar items por nome
export const findNameItem = (name) => async dispatch => {
    try {
        const res = await api.post(`/item/name`, { name });
   
        dispatch({
            type: 'QUERY_ITEM',
            payload: { items: res.data }
        })
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}
// cashflow
// adicionar item como item comercial 
export const addItemComercial = (item) => ({
    type: 'ADD_COMERCIAL_ITEM',
    payload: item
})
// editar item, atualizando apenas qts de kgs ou unidades
export const editItemComercial = (item) => ({
    type: 'EDIT_COMERCIAL_ITEM',
    payload: item
})
// checkar se o item ja ta no carrinho ou n para add ou editar
export const updateItemComercial = (item) => {
  return (dispatch, getState) => {
 
      let currentState = getState().storage.itemsComercial;
   
      
          if (currentState.some(itemComercial => itemComercial._id === item._id)) {
              dispatch(editItemComercial(item))
          } else {
              console.log('here 2')
             dispatch(addItemComercial(item))
          }
      
  }

}



// cashflow
// remover item comercial do carrinho
export const removeItemComercial = (item_id) => ({
    type: 'REMOVE_COMERCIAL_ITEM',
    payload: item_id
})
  
// atualizar estoque apos registro venda
// procurar e pegar items por nome
export const updateStorage = (products) => async dispatch => {
    try {
        const res = await api.post(`/item/sales`, { products });
         
      
    } catch (err) {
        console.log(err.message)
        dispatch({
            type: 'STORAGE_ERROR'
        })
        
    }
}