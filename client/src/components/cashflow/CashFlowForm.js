import React, { useState } from 'react'
// material-ui
import { Button, Paper, TextField, makeStyles, 
    Select, MenuItem, AttachMoneyIcon } from '../material-ui/material-ui'
import numeral from 'numeral'
// passando packages de formatação de numero pra portugues
import { numeralConfig } from './numeral';
numeralConfig();
numeral.locale('br')




export const useStyles = makeStyles(() => ({
    input: {
      width: '5.5rem',
      WebkitTextSizeAdjust: '0.5rem',
      textSizeAdjust: '0.5rem',
      fontSize: '12px',
      
    }
  
})
)

const CashFlowForm = ({ handleAddSale, balance, items }) => {
    const classes = useStyles();
    const [paymentType, setPaymentType] = useState('Método de pagamento');
    const onPaymentType = (e) => setPaymentType(e.target.value)
    const [value, setValue] = useState('');
    const handleChange = (e) => {
        const amount = e.target.value
        
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            setValue(amount);
          }
    }
    const handleSubmit = (e, products, balance) => {
        console.log('hnalde s')
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
        handleAddSale(newProducts, balance, paymentType)
        setValue('')
        setPaymentType('Método de pagamento')
       
    }
    return (
        <Paper className='cashflow-page__group-cart-form__box' elevation={3}>
            <form className='cashflow-page__group-cart-form__box-content' 
            onSubmit={(e) => handleSubmit(e, items, balance)}>
                <TextField 
                    id="sale-add" placeholder="R$0.00"  className={classes.input}
                      variant="outlined" autoComplete="off"
                    value={value} onChange={(e) => handleChange(e)} 
                />
                
                <h5>
                Troco: {value !== '' ? numeral(value - balance).format('$0,0.00') 
                : numeral(0).format('$0,0.00')}
                </h5>
                
                <h5> Balanço total: {numeral(balance).format('$0,0.00')}</h5>
      
                <Select value={paymentType} onChange={(e) => onPaymentType(e)}>
                    <MenuItem value='Método de pagamento'>Método de pagamento</MenuItem>
                    <MenuItem value='À vista'>À vista</MenuItem>
                    <MenuItem value='Cartão crédito'>Crédito</MenuItem>
                    <MenuItem value='Cartão débito'>Débito</MenuItem>
                    <MenuItem value='PIX'>PIX</MenuItem>
                </Select>

                <Button size="small" variant="contained" color="primary" type="submit"
                disabled={value === '' || !items.length > 1 ? true : false 
                || paymentType === 'Método de pagamento'}>
                    Finalizar compra
                </Button>
            </form>
        </Paper>
       
    )
}

export default CashFlowForm
