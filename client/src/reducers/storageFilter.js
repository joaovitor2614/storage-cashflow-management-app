

const initialState = {
    byName: '',
    byCategory: '',
    byVu: 0,
    byQe: '0'
}

const storageFilterReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'FILTER_NAME': 
        return {
            ...state,
            byName: payload,
        }
        case 'FILTER_CATEGORY': 
        return {
            ...state,
            byCategory: payload,
        }
        case 'FILTER_VU': 
        return {
            ...state,
            byVu: payload,
        }
        case 'FILTER_QE': 
        return {
            ...state,
            byQe: payload,
        }
        case 'CLEAR_FILTER': 
        return {
            ...state,
            byCategory: '',
            byVu: 0,
            byQe: '0',
        }
        default:
            return state
    }
}

export default storageFilterReducer