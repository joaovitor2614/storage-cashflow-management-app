import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {  AddIcon, Fab, Tooltip, makeStyles, 
    TextField, InputAdornment, CloseIcon, Grid,
    SearchIcon, IconButton, } from '../material-ui/material-ui'
import { filterBillDcp, filterBillClear } from '../../actions/billsFilter'
export const useStyles = makeStyles((theme) => ({
    input: {
      width: '32rem'
    },

    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        verticalAlign: 'middle'
        
    },
    item: {
        margin: `0 25px`
    }
   
  
})
)

const BillsActions = () => {
    const filters = useSelector(state => state.billsFilter)
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const onDspFilter = (e) => {
        const dcp = e.target.value
        
        dispatch(filterBillDcp(dcp))
    }
    const handleCleanFilter = () => {
        dispatch(filterBillClear())
    }
  
    return (
        <Grid container className={classes.root}>
            <Grid className={classes.item} item xs='auto'>
                <TextField 
                        id="name-filter" style={{ margin: 8 }} 
                        className={classes.input}
                        placeholder="Procurar nota por motivo..." margin="normal" variant="outlined"
                        value={filters.byDescription} onChange={(e) => onDspFilter(e)}  
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={() => handleCleanFilter()}>
                                    <CloseIcon />   
                                </IconButton>
                            
                            </InputAdornment>,
                            startAdornment: <InputAdornment position="start">
                                                <SearchIcon></SearchIcon>
                                        </InputAdornment>
                        
                        }}
                />
                
            </Grid>
           
            
             <Grid item xs='auto'>
                <Tooltip  title='add' onClick={() => history.push('/add-bill')} 
                            aria-label='add'>
                                <Fab color="primary">
                                    <AddIcon />
                                </Fab>
                </Tooltip>
            </Grid>
           
        </Grid>
    )
}

export default BillsActions
