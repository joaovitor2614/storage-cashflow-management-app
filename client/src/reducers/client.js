// reducer para registro de vendas

const initialState = {
    loading: true,
    clients: [],
    client: {}
}


const clientReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'GET_CLIENTS':
            return {
                ...state,
                loading: false,
                clients: [...payload.clients]
            }
        case 'GET_CLIENT':
            return {
                ...state,
                loading: false,
                client: {
                    ...payload.client
                }
            }
        
        
        case 'ADD_CLIENT':
            return {
            ...state,
            loading: false,
            clients: [payload, ...state.clients]
           }
        case 'REMOVE_CLIENT': 
          return {
              ...state,
              loading: false,
              clients: state.clients.filter((client) => client._id !== payload.id)
          }
        case 'EDIT_CLIENT':
            return {
                ...state,
                loading: false,
                clients: state.clients.map(client => client._id === payload.id 
                    ? { ...payload.client } 
                    : client)
            }
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'CLEAN_CLIENT':
            return {
                ...state,
                client: {}
            }
        case 'LOGOUT': 
            return {
                loading: true,
                clients: [],
                client: {}
            }
        
         
        default:
            return state
    }
}

export default clientReducer