// reducer para registro de vendas

const initialState = {
    loading: true,
    bills: [],
    history: [],
    bill: {}
}


const billsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'GET_BILLS':
            return {
                ...state,
                loading: false,
                bills: [...payload.notPaid],
                history: [...payload.paid],
           
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
        case 'REMOVE_BILL_HISTORY': 
          return {
              ...state,
              loading: false,
              history: state.history.filter((bill) => bill._id !== payload.id)
          }
        case 'PAY_BILL': 
          return {
              ...state,
              loading: false,
              bills: state.bills.filter((bill) => bill._id !== payload.id),
              history: [payload.bill, ...state.history]
          }
        case 'EDIT_BILL':
            return {
                ...state,
                loading: false,
                bills: state.bills.map(bill => bill._id === payload.id 
                    ? { ...payload.bill } 
                    : bill)
            }
        case 'EDIT_BILL_HISTORY':
                return {
                    ...state,
                    loading: false,
                    history: state.history.map(bill => bill._id === payload.id 
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
                bill: {},
                history: []
            }
        
         
        default:
            return state
    }
}

export default billsReducer