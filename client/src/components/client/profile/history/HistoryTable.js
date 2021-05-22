import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { IconButton, makeStyles, TableCell, 
    TableBody, TableHead, Typography,
    TableRow, KeyboardArrowDownIcon, TableContainer, 
    Paper, KeyboardArrowUpIcon, Collapse, Table, Box, DeleteIcon } from '../../../material-ui/material-ui'
import useHistoryTable from '../../../hooks/useHistoryTable';
import LoadingPage from '../../../LoadingPage';
import numeral from 'numeral'
import { removeClientHistory } from '../../../../actions/client'
const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

  const Row = (props) => {
      const dispatch = useDispatch()
    const { row, client_id } = props;
    const [open, setOpen] = useState(false);
    const classes = useRowStyles();
    const handleRemovePurchase = (client_id, history_id) => {
        dispatch(removeClientHistory(client_id, history_id));
    }
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
                <TableCell align="right">{dayjs(row.date).format('L')}</TableCell>
                <TableCell align="right">
                    <IconButton onClick={() => handleRemovePurchase(client_id, row.history_id)}>
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


  
  const HistoryTable = ({ history, loading, client_id }) => {

      const { rows } = useHistoryTable(history)
      return loading ? <LoadingPage /> : (
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
                {rows.map((row) => (
                    <Row client_id={client_id} key={row.history_id} row={row} />
                ))}
                </TableBody>
            </Table>
          </TableContainer>
      )
  }
  
  export default HistoryTable
  