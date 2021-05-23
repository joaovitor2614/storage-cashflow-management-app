import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clientByName, clientClearFilter } from '../../actions/clientFilter';
import { TextField, InputAdornment, SearchIcon, 
    makeStyles, CloseIcon, IconButton, 
    Tooltip, Fab, AddIcon, Grid } from '../material-ui/material-ui'


export const useStyles = makeStyles(() => ({
    input: {
      width: '32rem',
      marginRight: '30px'
    },
    root: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        verticalAlign: 'middle'
        
    },
    item: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
       
    }
   
   
  
})
)

const ClientTop = ({ clients, filters }) => {
    const history = useHistory();
    const classes = useStyles()
    const dispatch = useDispatch();
    // limpar filtro por nome
    const handleCleanFilter = () => dispatch(clientClearFilter())
    const onNameFilter = e => dispatch(clientByName(e.target.value));
    return (
        <Grid container className={classes.root}>
            <Grid item xs='auto'>
                <h3>Clientes cadastrados: {clients.length}</h3>
            </Grid>
            
            <Grid item xs='auto' className={classes.item}>
                <TextField 
                        id="name-filter" style={{ margin: 8 }} 
                        className={classes.input}
                        placeholder="Procurar cliente..." margin="normal" variant="outlined"
                        value={filters.byName} onChange={(e) => onNameFilter(e)}  
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
                <Tooltip  title='add' onClick={() => history.push('/add-client')} 
                            aria-label='add'>
                                <Fab color="primary">
                                    <AddIcon />
                                </Fab>
                </Tooltip>
            </Grid>
            
        </Grid>
    )
}

export default ClientTop
