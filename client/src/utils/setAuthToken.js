import api from './api'

const setAuthToken = token => {
    if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common['x-auth-token'] = token;
       
    } else {
   
        localStorage.removeItem('token')
        delete api.defaults.headers.common['x-auth-token'];
        
    }
}

export default setAuthToken
