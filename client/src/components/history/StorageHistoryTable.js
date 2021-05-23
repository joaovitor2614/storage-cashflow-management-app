
import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux'
import { removeSale } from '../../actions/sales';
import useDataTableDaily from '../hooks/useDataTableDaily'
import { DeleteIcon, IconButton, Table, TableCell, TableBody, TableContainer, TableHead,
TablePagination, TableRow, Paper, makeStyles, 
 Typography, Box, Collapse, 
KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '../material-ui/material-ui';

import numeral from 'numeral'






const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

  const Row = (props) => {
      const dispatch = useDispatch()
    const { row } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
  
    return (
        <>
            <TableRow className={classes.row}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                    {numeral(parseFloat(row.balance, 10)).format('$0,0.00')}
                </TableCell>
                <TableCell align="right">{row.paymentType}</TableCell>
                <TableCell align="center">{row.productsAmount}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">
                    <IconButton onClick={() => dispatch(removeSale(row._id))}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
               
                
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Produtos
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Produto</TableCell>
                                        <TableCell>Unidade</TableCell>
                                        <TableCell align="right">Quilograma</TableCell>
                                
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell component="th" scope="row">
                                                {product.name}
                                            </TableCell>

                                            <TableCell align="center">{product.units}</TableCell>
                                            <TableCell align="center">{product.kgs}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>

                    
                </TableCell>
            </TableRow>
        </>
    )
}

const StorageHistoryTable = ({ itemSales, type }) => {

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
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Valor</TableCell>
                    <TableCell align="right">Método</TableCell>
                    <TableCell align="right">Número de produtos</TableCell>
                    <TableCell align="center">Data</TableCell>
                    <TableCell align="center">Operação</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <Row key={row._id} row={row} />
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Paper>
            <TablePagination
                                rowsPerPageOptions={[9, 11, 15, 20, 30]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}>
            </TablePagination>
            </Paper>
           
        </>
    )
}
export default StorageHistoryTable