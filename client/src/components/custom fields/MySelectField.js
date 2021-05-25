import React from 'react';
import { useField, Field } from 'formik';
import { Select, MenuItem, InputLabel, makeStyles } from '../material-ui/material-ui'


export const useStyles = makeStyles(() => ({
    input: {
      width: '17rem',
      
    }
  
})
)

const MySelectField = ({ label, id, ...props }) => {
  const classes = useStyles()
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
   <div className='my-selectfield'>
       <InputLabel htmlFor={id}>{label}</InputLabel>
       <Select className={classes.input} {...field}   id={id} 
       >
            <MenuItem value='Alimentação'>Alimentação</MenuItem>
            <MenuItem value='Acessórios'>Acessórios</MenuItem>
            <MenuItem value='Higiene'>Higiene</MenuItem>
            <MenuItem value='Brinquedos'>Brinquedos</MenuItem>
            <MenuItem value='Outros'>Outros</MenuItem>
       </Select>
       {errorText !== '' && <p className="error-text">{errorText}</p>}
   </div>
   
  )
}

export default MySelectField