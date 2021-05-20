import React from 'react'
import { useDispatch } from 'react-redux'
import { clientByName, clientClearFilter } from '../../actions/clientFilter';
import { TextField, InputAdornment, SearchIcon, makeStyles, CloseIcon, IconButton } from '../material-ui/material-ui'


export const useStyles = makeStyles(() => ({
    input: {
      width: '32rem'
    },
   
  
})
)

const ClientTop = ({ clients, filters }) => {
    const classes = useStyles()
    const dispatch = useDispatch();
    // limpar filtro por nome
    const handleCleanFilter = () => dispatch(clientClearFilter())
    const onNameFilter = e => dispatch(clientByName(e.target.value));
    return (
        <div>
            <h3>Clientes cadastrados: {clients.length}</h3>
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
            
        </div>
    )
}

export default ClientTop
