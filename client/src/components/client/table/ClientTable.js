import React, {useState} from 'react'

import useClientsTable from '../../hooks/useClientsTable'
// material-ui
import { Paper, TableContainer, 
    TableHead, Table, TableCell, TableBody, 
    TablePagination, makeStyles, TableRow, Box } from '../../material-ui/material-ui'
import columns from './columns'
import OperationsBtn from './OperationsBtn'

const useStyles = makeStyles({
        root: {
            width: '1100px'
          
        },
        container: {
            maxHeight: 490,
        },
        
    })

const ClientTable = ({ clients, filters }) => {

    const classes = useStyles()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { rows } = useClientsTable(clients, filters);
    
    // pagination logic...
    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    }
    
    return (
        <Box width={"920px"} >
            <Paper elevation={1}>
                <TableContainer>
                    <Table stickyHeader aria-label='tabela-clientes'>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align}
                                     style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                               return (
                                   <TableRow  hover role="checkbox"
                                   tabIndex={-1} key={row._id}>
                                       {columns.map((column) => {
                                           const value = row[column.id];
                                           return (
                                               <TableCell key={column.id} align={column.align}>
                                                   {value}
                                                   {column.renderCell && 
                                                   <OperationsBtn id={row._id} />}
                                               </TableCell>
                                           )
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
        </Box>
    )
}

export default ClientTable
