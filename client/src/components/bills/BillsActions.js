import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { filterBillDcp, filterBillClear } from '../../actions/billsFilter'
import {  AddIcon, Fab, Tooltip, makeStyles, 
    TextField, InputAdornment, CloseIcon, 
    SearchIcon, IconButton } from '../material-ui/material-ui'

export const useStyles = makeStyles(() => ({
    input: {
      width: '32rem'
    },
   
  
})
)

const BillsActions = () => {
    const filters = useSelector(state => state.billsFilter)
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const onDspFilter = (e) => {
        const dcp = e.target.value
        console.log('dpc', dcp)
        dispatch(filterBillDcp(dcp))
    }
    const handleCleanFilter = () => {
        dispatch(filterBillClear())
    }
    return (
        <div>
             <Tooltip  title='add' onClick={() => history.push('/add-bill')} 
                        aria-label='add'>
                            <Fab color="primary">
                                <AddIcon />
                            </Fab>
            </Tooltip>
            <TextField 
                    id="name-filter" style={{ margin: 8 }} 
                    className={classes.input}
                    placeholder="Procurar cliente..." margin="normal" variant="outlined"
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
        </div>
    )
}

export default BillsActions
