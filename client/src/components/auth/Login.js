import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';



import { login } from '../../actions/auth';

const Login = () => {
    const dispatch = useDispatch()
    const [isPassword, setIsPassword] = useState(true);
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    })
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(login(formData))
    }
    
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
 
    return (
       <div className='login-page'>
          <div className='login-page__box'>
            <form className='login-page__box-form' onSubmit={handleSubmit}>
                  <h2>Login</h2>
                  <InputLabel htmlFor="input-email">Email</InputLabel>
                  <TextField style={{ width: '17rem' }} onChange={handleChange} type="email" name="email" id="input-email" 
                  variant="outlined" placeholder="Insira email..." />

                  <InputLabel htmlFor="input-password">Senha</InputLabel>
                  <TextField style={{ width: '17rem' }} onChange={handleChange} 
                  type={isPassword === true ? "password" : "text"} 
                  name="password" id="input-password"variant="outlined" 
                  placeholder="Insira senha..."
                  InputProps={{
                      startAdornment: (
                        <InputAdornment
                        style={{ cursor: 'pointer'}}
                        onClick={() => setIsPassword(!isPassword)} position="start">
                          {isPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </InputAdornment>
                      )
                    }}
                  />
                  <div>
                    <button className="button button--primary" type="submit">Prosseguir</button>
                  </div>
                  
              </form>
          </div>
          
       </div>
        
    )
}

export default Login
