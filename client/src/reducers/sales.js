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
        case 'REMOVE_SALE':
            return {
                ...state,
                sales: {
                    dailySales: state.sales.dailySales.filter(({ _id }) => _id !== payload.id),
                    monthlySales: state.sales.monthlySales.filter(({ _id }) => _id !== payload.id)
                }
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