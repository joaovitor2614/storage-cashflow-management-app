

const initialState ={
    token: localStorage.getItem('item'),
    isAuthenticated: false,
    loading: true,
    user: null
}

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case 'LOAD_USER':
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false
            }
        case 'LOGIN_SUCESS':
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case 'LOGOUT':
        localStorage.removeItem('token')
            return {
                token: null,
                isAuthenticated: false,
                loading: true,
                user: null
            }
        default:
            return state
    }
}