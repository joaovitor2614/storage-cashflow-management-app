

const initialState = {
    byDescription: '',
}

const billsFilterReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'FILTER_BILL_DCP': 
        return {
            ...state,
            byDescription: payload,
        }
       
        case 'CLEAR_BILL_FILTER': 
        return {
           byDescription: ''
        }
        default:
            return state
    }
}

export default billsFilterReducer