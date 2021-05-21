import React from 'react';
import { useField, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
    input: {
      width: '17rem'
    }
  
})
)

const MyTextField = ({ label, id, type = '', placeholder, ...props }) => {
  const classes = useStyles()
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
   <div className='my-textfield'>
       <InputLabel htmlFor={id}>{label}</InputLabel>
       <TextField className={classes.input} {...field} type={type ? type : ''} 
       variant="outlined" id={id}  error={errorText !== '' ? true : false} 
       helperText={errorText}  placeholder={placeholder}  />
   </div>
   
  )
}

export default MyTextField