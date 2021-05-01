// reducer para registro de vendas

const initialState = {
    sales: {
        dailySales: [],
        monthlySales: []
    },
    loading: true
}


const salesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'GET_SALES':
            return {
                ...state,
                sales: {
                    dailySales: [...payload.dailySales],
                    monthlySales: [...payload.monthlySales]
                },
                loading: false
            }
        case 'LOGOUT':
            return {
                sales: {
                    dailySales: [],
                    monthlySales: []
                },
                loading: true
            }
        
         
        default:
            return state
    }
}

export default salesReducer