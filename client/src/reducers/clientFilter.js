

const initialState = {
    byName: '',
  
}

const clientReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'FILTER_CLIENT_NAME': 
        return {
            ...state,
            byName: payload,
        }
       
        case 'CLEAR_CLIENT_FILTER': 
        return {
           byName: ''
        }
        default:
            return state
    }
}

export default clientReducer