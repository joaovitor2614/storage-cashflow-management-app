import React from 'react'
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
   
    input: {
        width: '23.5rem',
      
    }
})
)

const CashFlowQuery = ({ handleQuery }) => {
    const classes = useStyles();
  
    return (
        <div >
            <TextField id="standard-basic" className={classes.input} onChange={(e) => handleQuery(e)}placeholder="Procurar produto..." 
             InputProps={{
            endAdornment: <InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>,
          }} />
        </div>
    )
}

export default CashFlowQuery
