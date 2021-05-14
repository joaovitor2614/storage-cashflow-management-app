import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux'
import { editSale, removeSale } from '../../actions/sales';
import useDataTableDaily from '../hooks/useDataTableDaily'
import { DeleteIcon, IconButton, Table, TableCell, TableBody, TableContainer, TableHead,
TablePagination, TableRow, Paper, makeStyles } from '../material-ui/material-ui';
import StorageModal from './StorageModal';

const RenderDeleteButton = ({ handleRemove, id }) => {
   return (
    <strong>
        <IconButton onClick={() => {handleRemove(id)}}>
            <DeleteIcon />
        </IconButton>
    </strong>
)

} 

const columns = [
    { id: 'name', label: 'Produto', align: 'left', minWidth: 150 },
    { id: 'units', label: 'Unidades', minWidth: 70, align: 'center' },
    { id: 'paymentType', label: 'Método', minWidth: 100, align: 'center' },
    { id: 'kgs', label: 'Quilo', minWidth: 70, align: 'center' },
    { id: 'date', label: 'Data/Hora', align: 'center', minWidth: 100 },
    { id: 'operation', label: 'Operação', renderCell: RenderDeleteButton,
     disableClickEventBubbling: true, align: 'right', minWidth: 70 },
]

const useStyles = makeStyles({
    root: {
        borderRadius: '30px',
        width: '770px',
      
        wordBreak: 'break-all'
      
    },
    table: {
        borderRadius: '30px',
    }
  
    
})

const StorageHistoryTable = ({ itemSales, type, }) => {
 

    const classes = useStyles();
    const dispatch = useDispatch()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);
    const { rows } = useDataTableDaily(itemSales, type)
    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    }

    // remover venda
    const handleRemove = (id) => {
        dispatch(removeSale(id))
    }
 

    return ( 
            <Paper className={classes.root}>
                            <TableContainer className={classes.table}>
                            <Table stickyHeader aria-label='sticky table'>
                                <TableHead>
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
                                                <TableRow 
                                                hover role="checkbox" 
                                                tabIndex={-1} key={row._id}
                                              
                                
                                                >
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                                                {column.renderCell && <RenderDeleteButton handleRemove={handleRemove} id={row._id} />}
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
                            rowsPerPageOptions={[9, 5]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}>
                        </TablePagination>
                     
            </Paper>
           
         

    )
}
export default StorageHistoryTable