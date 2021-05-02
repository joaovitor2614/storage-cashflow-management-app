import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import useDataTable from '../hooks/useDataTable';
import { useStorageTable } from '../../styles/components/storage/useStorage';
import getStorage from '../../selectors/storage';
import StorageAddModal from './StorageAddModal';
import { editItem, removeItem } from '../../actions/storage';


const columns = [
    { id: 'name', label: 'Produto', minWidth: 130 },
    { id: 'category', label: 'Categoria', minWidth: 130, align: 'center' },
    { id: 'weight', label: 'Peso(KG)', align: 'center', minWidth: 70 },
    { id: 'vU', label: 'Preço(R$)',  minWidth: 70, align: 'center'},
    { id: 'qE', label: 'Quant em estoque',  minWidth: 70, align: 'center'},
    { id: 'profitUnit', label: 'Lucro(unit.)',  minWidth: 60, align: 'center', format: (value) => value.toLocaleString('pt-BR') },
    { id: 'profitKg', label: 'Lucro(kg)',  minWidth: 60, align: 'center', format: (value) => value.toLocaleString('pt-BR') },
    { id: 'validity', label: 'Validade', minWidth: 120, align: 'center' },
 
]




const useStyles = makeStyles({
    root: {
        width: '1000px'
      
    },
    container: {
        maxHeight: 490,
    },
    
})




const StorageTable = ({ items, filters }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({})
    const [open, setOpen] = useState(false)
    // variavel rows será populada com dados dos produtos dinamicamente de acordo com os filtros presentes no estado global
    const { rows } = useDataTable(items, filters);
    console.log('rows in talbe', rows)
    const classes = useStorageTable();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    }
    // funções para abrir e fechar modal
    const handleOpen = (row) => {
        setData({ ...row })
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    // função para editar item
    const handleSubmit = (data, id) => {
           dispatch(editItem(data, id));
           
    }
      const handleRemove = (id) => {
           dispatch(removeItem(id));
           handleClose();
           
    }
  
  return (
      <div className={classes.storageTable}>
         <Paper className={classes.paper}>
                <TableContainer >
                    <Table stickyHeader aria-label='sticky table'>
                        <TableHead className={classes.header}>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                
                                return (
                                    <TableRow style={{ cursor: 'pointer' }} 
                                    onClick={() => handleOpen(row)} hover role="checkbox" 
                                    tabIndex={-1} key={row.id}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                >

                </TablePagination>

            </Paper>
            <StorageAddModal handleSubmit={handleSubmit} handleRemove={handleRemove} 
                open={open} handleClose={handleClose} data={data} 
            />
      </div>
      
  )
}
 

export default StorageTable