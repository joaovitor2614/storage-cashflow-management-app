// reducer para registro de vendas

const initialState = {
    loading: true,
    history: {}
}


const historyReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'GET_CLIENT':
        return {
            ...state,
            history: {...payload},
            loading: false,
           
        }
        case 'CLIENT_REMOVE_HISTORY':
            return {
                ...state,
                loading: false,
                history:   { ...state.history, history: state.history.history.filter(sale => sale._id !== payload.history_id)}
                }
        case 'LOGOUT': 
            return {
                loading: true,
        
                history: {},
             
            }
        
         
        default:
            return state
    }
}

export default historyReducer