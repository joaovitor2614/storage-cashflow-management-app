// reducer para registro de vendas

const initialState = {
    loading: true,
    clients: [],
    clientsQuery: [],
    client: {},
    clientHistory: {}
}


const clientReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'GET_CLIENTS':
            return {
                ...state,
                clients: [...payload.clients],
                loading: false,
               
            }
        case 'GET_CLIENT':
            return {
                ...state,
                client: {
                   
                    ...payload
                },
                loading: false,
             
            }
        case 'GET_CLIENT_HISTORY':

                return {
                    ...state,
                    clientHistory: {
                       
                        ...payload
                    },
                    loading: false,
                 
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
        case 'CLIENT_QUERY':
            return {
                ...state,
                loading: false,
                clientsQuery: payload
            }
        case 'CLEAN_CLIENT_QUERY':
            return {
                ...state,
                loading: false,
                clientsQuery: []
            }
        case 'CLIENT_ADD_HISTORY':
            return {
                ...state,
                loading: false,
                clientsQuery: []
          
            }
        case 'CLIENT_GET_HISTORY':
                return {
                    ...state,
                    loading: false,
                    clients: state.clients.map(client => client._id === payload.client_id 
                        ? { ...client, history: [...payload.history, ...client.history]} : client)
              
                }
        case 'CLIENT_REMOVE_HISTORY':
            return {
                ...state,
                loading: false,
                clients: state.clients.map(client => client._id === payload.client_id 
                    ? { ...client, history: client.history.filter(sale => sale._id !== payload.history_id)} : client)
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
                client: {},
                clientHistory: {}
            }
        
         
        default:
            return state
    }
}

export default clientReducer