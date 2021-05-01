import axios from 'axios'
import api from '../utils/api'
import { toast } from 'react-toastify'

export const loadUser = () => async dispatch => {
 

    try {
        const res = await api.get('/auth');
        dispatch({
            type: 'LOAD_USER',
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: 'AUTH_ERROR'
        })
        
    }
}

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});

    try {
       const res = await api.post('/users', body, config);
       dispatch({
           type: 'REGISTER_SUCESS',
           payload: res.data
       })
       dispatch(loadUser());
    } catch(err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: 'REGISTER_FAIL'
        })
    }
}

export const login = (data) => async dispatch => {
 

    try {
       const res = await api.post('/auth', data);
       dispatch({
           type: 'LOGIN_SUCESS',
           payload: res.data
       })
       console.log(res.data)
       toast.success('✔️  Login efetuado com sucesso', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })

    } catch(err) {
        console.log(err)
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error =>  toast.error(`❌   ${error.msg}`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }));
          }
      
      
        dispatch({
            type: 'LOGIN_FAIL'
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: 'CLEAR_PROFILE'
    })
    dispatch({
        type: 'LOGOUT'
    })
    
}

