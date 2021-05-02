import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import numeral from 'numeral'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { numeralConfig } from './numeral';
// passando packages de formatação de numero pra portugues
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
        handleAddSale(newProducts, balance)
        setValue('')
       
    }
    return (
        <Paper className='cashflow-page__group-cart-form__box' elevation={3}>
            <form className='cashflow-page__group-cart-form__box-content' 
            onSubmit={(e) => handleSubmit(e, items, balance)}>
                <TextField 
                    id="sale-add" placeholder="R$0.00"  className={classes.input}
                      variant="outlined"
                    value={value} onChange={(e) => handleChange(e)} 
                />
                
                <h5>
                Troco: {value !== '' ? numeral(value - balance).format('$0,0.00') 
                : numeral(0).format('$0,0.00')}
                </h5>
                
                <h5> Balanço total: {numeral(balance).format('$0,0.00')}</h5>

                <Button size="small" variant="contained" color="primary" type="submit"
                disabled={value === '' || !items.length > 1 ? true : false} >
                    Finalizar compra
                </Button>
            </form>
        </Paper>
       
    )
}

export default CashFlowForm
