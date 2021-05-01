

const initialState = {
    items: [],
    itemsFlow: [],
    itemsComercial: [],
    item: {},
    loading: true
}

const storageReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'GET_ITEMS': 
        return {
            ...state,
            items: payload,
            loading: false
        }
        case 'GET_ITEM':
        
        return {
            ...state,
            items: [...state.items, payload],
            loading: false
        }
        case 'EDIT_ITEM':
        
        return {
            ...state,
            items: state.items.map(item => item._id === payload.item_id ? { ...payload.item } : item),
            loading: false
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== payload.item_id),
                loading: false
            } 
        case 'QUERY_ITEM': 
            return {
                ...state,
                itemsFlow: [...payload.items],
                loading: false
            }
        case 'EDIT_COMERCIAL_ITEM': 
        return {
            ...state,

            itemsComercial: state.itemsComercial.map((item) => item._id === payload._id 
            ? item.perKg ? { ...item, kgs: item.kgs + payload.kgs} 
            : { ...item, units: item.units + payload.units } : item),
            loading: false
        }
        case 'ADD_COMERCIAL_ITEM': 
        return {
            ...state,
            itemsComercial: [...state.itemsComercial, payload],
            loading: false
        }
        case 'REMOVE_COMERCIAL_ITEM': 
        return {
            ...state,
            itemsComercial: state.itemsComercial.filter(item => item._id !== payload),
            loading: false
        }
        case 'ADD_SALE': 
        return {
            ...state,
            itemsFlow: [],
            itemsComercial: [],
            loading: false
        }
        case 'LOGOUT':
            return {
                items: [],
                itemsFlow: [],
                itemsComercial: [],
                item: {},
                loading: true
            }
        
        
        default:
            return state
    }
}

export default storageReducer