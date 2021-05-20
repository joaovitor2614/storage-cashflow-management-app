// reducer para registro de vendas

const initialState = {
    loading: true,
    bills: [],
    bill: {}
}


const billsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'GET_BILLS':
            return {
                ...state,
                loading: false,
                bills: [...payload.bills]
            }
        case 'GET_BILL':
            return {
                ...state,
                loading: false,
                bill: {
                    ...payload.bill
                }
            }
        
        
        case 'ADD_BILL':
            return {
            ...state,
            loading: false,
            bills: [payload, ...state.bills]
           }
        case 'REMOVE_BILL': 
          return {
              ...state,
              loading: false,
              bills: state.bills.filter((bill) => bill._id !== payload.id)
          }
        case 'EDIT_BILL':
            return {
                ...state,
                loading: false,
                bills: state.bills.map(bill => bill._id === payload.id 
                    ? { ...payload.bill } 
                    : bill)
            }
        case 'LOADING_BILL':
            return {
                ...state,
                loading: true
            }
      
        case 'LOGOUT': 
            return {
                loading: true,
                bills: [],
                bill: {}
            }
        
         
        default:
            return state
    }
}

export default billsReducer