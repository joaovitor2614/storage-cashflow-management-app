import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import numeral from 'numeral'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { numeralConfig } from './numeral';
// passando packages de formatação de numero pra portugues
numeralConfig();
numeral.locale('br')

const CashFlowForm = ({ handleAddSale, balance, items }) => {
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
        <form onSubmit={(e) => handleSubmit(e, items, balance)}>
            <TextField 
                id="sale-add" label="Valor de pagamento" 
                placeholder="Insira valor de pagamento..."  variant="outlined"
                value={value} onChange={(e) => handleChange(e)} 
            />
            
            <h4>
            Troco: {value !== '' ? numeral(value - balance).format('$0,0.00') 
            : numeral(0).format('$0,0.00')}
            </h4>
            <h4><AttachMoneyIcon /> Balanço total: {numeral(balance).format('$0,0.00')}</h4>
            <Button variant="contained" color="primary" type="submit"
            disabled={value === '' || !items.length > 1 ? true : false} >
                Finalizar compra
            </Button>
        </form>
    )
}

export default CashFlowForm
