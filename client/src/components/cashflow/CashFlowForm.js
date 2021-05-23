import React, { useState } from 'react'

// material-ui
import { Button, Paper, TextField, makeStyles, 
    Select, MenuItem, AttachMoneyIcon, 
    Grid, IconButton, HighlightOffIcon } from '../material-ui/material-ui'
import numeral from 'numeral'
// passando packages de formatação de numero pra portugues
import { numeralConfig } from './numeral';
import CashFlowModal from './CashFlowModal';

numeralConfig();
numeral.locale('br')




export const useStyles = makeStyles((theme) => ({
    input: {
      width: '8.5rem',
  
      fontSize: '12px',
      
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(1)
    },
    Icon: {
        color: theme.palette.primary.main,
        fontSize: "27px !important",
        [theme.breakpoints.down("xs")]: {
          "& > *": {
             margin: 0,
           },
        },
    },
  
})
)

const CashFlowForm = ({ handleAddSale, balance, items, handleClientQuery, clients }) => {
    const [selectedClient, setSelectedClient] = useState(null)
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [paymentType, setPaymentType] = useState('Método');
    const onPaymentType = (e) => setPaymentType(e.target.value)
    const [value, setValue] = useState('');
    // fechar modal
    const handleClose = () => setOpen(false)
    const handleChange = (e) => {
        const amount = e.target.value
        
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setValue(amount);
          }
    }
    const handleSubmit = (e, products, balance) => {
       
        e.preventDefault();
        const newProducts = [];
        products.forEach((product) => {
            newProducts.push({
                name: product.name,
                units: product.units ? product.units : 0,
                kgs: product.kgs ? product.kgs : 0,
                product_id: product._id
            })
        })
        handleAddSale(newProducts, balance, paymentType, selectedClient, setSelectedClient)
        setValue('')
        setPaymentType('Método')
       
    }
    return (
        <Grid container className={classes.root}>
            <Grid item xs='auto'>
                <Paper className='cashflow-page__group-cart-form__box' elevation={3}>
                    <form className='cashflow-page__group-cart-form__box-content' 
                    onSubmit={(e) => handleSubmit(e, items, balance)}>
                        <TextField 
                            id="sale-add" placeholder="R$0.00"  className={classes.input}
                            variant="outlined" autoComplete="off"
                            value={value} onChange={(e) => handleChange(e)}
                        />
                        
                    
            
                        <Select value={paymentType} onChange={(e) => onPaymentType(e)}>
                            <MenuItem value='Método'>Método</MenuItem>
                            <MenuItem value='À vista'>À vista</MenuItem>
                            <MenuItem value='Cartão crédito'>Crédito</MenuItem>
                            <MenuItem value='Cartão débito'>Débito</MenuItem>
                            <MenuItem value='PIX'>PIX</MenuItem>
                            <MenuItem value='Outros'>Outros</MenuItem>
                        </Select>
                
                        <Button size="small" variant="contained" color="primary" type="submit"
                        disabled={value === '' || !items.length > 1 ? true : false 
                        || paymentType === 'Método'}>
                            Finalizar
                        </Button>
                        <button type='button' className='button button--primary' 
                        onClick={() => setOpen(true)}>
                            Cliente
                        </button>
                       
                    </form>
                </Paper>
            </Grid>
            <Grid item xs='auto'>

                <Paper className='cashflow-page__group-cart-form__box-content2' elevation={3}>
                    <h5> Balanço total: {numeral(balance).format('$0,0.00')}</h5>
                    <h5>
                        Troco: {value !== '' ? numeral(value - balance).format('$0,0.00') 
                        : numeral(0).format('$0,0.00')}
                    </h5>
                    {selectedClient !== null 
                    ? <h5>Cliente selecionado: {selectedClient.name}</h5>
                    : <h5>Cliente selecionado: Nenhum</h5>}
                   
                        
                </Paper>
       
            </Grid>
            <CashFlowModal handeClose={handleClose} 
            setOpen={setOpen} open={open} 
            handleClientQuery={handleClientQuery}
            clients={clients} setSelectedClient={setSelectedClient}
            />
           
        </Grid>
        
    )
}

export default CashFlowForm
