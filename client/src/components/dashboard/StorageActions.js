// componente para pesquisar itens e adicionar
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// material-ui components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
// filter & crud
import { useButton } from '../../styles/reusable/useButton';
import { storageByName, storageByQe, storageByCategory, clearFilter } from '../../actions/storageFilter';
import StorageAddModal from './StorageAddModal';
import { addItem } from '../../actions/storage'


export const useStyles = makeStyles(() => ({
    input: {
      width: '32rem'
    },
    select: {
        width: '15rem'
    }
  
})
)


const StorageActions = ({ filters }) => {
    // styles classes
    const classes = useStyles();
    const dispatch = useDispatch();
    // variaves para abrir ou fechar filtros avançados (todos os filtros exceto o de nome)
    const [advancedFilter, setAdvancedFilter] = useState(false);
    // variaveis para fechar e abrir modal abaixo
    const [open, setOpen] = useState(false)
    
    // filtros
    const onNameFilter = e => dispatch(storageByName(e.target.value));
    const onCategoryFilter = e => dispatch(storageByCategory(e.target.value));
    const onQeFilter = e => dispatch(storageByQe(e.target.value));
        
    
    // funcionalidade de abrir e fechar modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = (item) => {
        dispatch(addItem(item));
   }
   // função para fechar e abrir filtros avançados(ao fechar filtros, limpar filtros tbm)
   const handleShowFilter = () => {
       if (advancedFilter === false) {
           setAdvancedFilter(true);
       } else {
        setAdvancedFilter(false);
        dispatch(clearFilter())
       }
   }
    return (
        <div className='storage-page__actions'>
            <div className='storage-page__actions-main'>
                <TextField 
                    id="name-filter" label="Procurar por nome" style={{ margin: 8 }} className={classes.input}
                    placeholder="Procura item por nome..." margin="normal" variant="outlined"
                    value={filters.byName} onChange={(e) => onNameFilter(e)}  
                       InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>
                    }}
                />
                <IconButton onClick={() => handleShowFilter()}>
                    <FilterListRoundedIcon />
                </IconButton>
                 <Tooltip title='add' onClick={() => handleOpen()} aria-label='add'>
                    <Fab color="primary">
                        <AddIcon />
                    </Fab>
                </Tooltip>
            
              
                
            </div>
          
            
                <Collapse in={advancedFilter} timeout="auto" unmountOnExit>
                    <div className='storage-page__actions-secondary'>
                            <div>
                                <InputLabel className={classes.select} htmlFor="category-filter">
                                Filtrar por categoria</InputLabel>
                                <Select  defaultValue='Todas' id="category-filter" 
                                value={filters.byCategory} className={classes.select}
                                onChange={(e) => onCategoryFilter(e)}>
                                        <MenuItem value='All'>Sem filtros</MenuItem>
                                        <MenuItem value='Alimentação'>Alimentação</MenuItem>
                                        <MenuItem value='Acessórios'>Acessórios</MenuItem>
                                        <MenuItem value='Higiene'>Higiene</MenuItem>
                                        <MenuItem value='Brinquedos'>Brinquedos</MenuItem>
                                        <MenuItem value='Outros'>Outros</MenuItem>
                                </Select>
                            </div>
                            <div>

                                <InputLabel htmlFor="q/e-filter">Filtrar por quantidade em estoque</InputLabel>
                                <Select className={classes.select}  id="q/e-filter" value={filters.byQe} 
                                onChange={(e) => onQeFilter(e)}>
                                        <MenuItem value='0'>Sem filtros</MenuItem>
                                        <MenuItem value='1 a 5'>1 a 5</MenuItem>
                                        <MenuItem value='6 a 15'>6 a 15</MenuItem>
                                        <MenuItem value='16 a 50'>16 a 50</MenuItem>
                                        <MenuItem value='51+'>50+</MenuItem>
                                </Select>
                            </div>
                           
                    </div>
                         
                </Collapse>
             
               
            
            
            
            <StorageAddModal handleSubmit={handleSubmit} open={open} handleClose={handleClose} />
        </div>
    )
}

export default StorageActions
