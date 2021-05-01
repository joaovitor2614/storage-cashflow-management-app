import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import numeral from 'numeral'
import { numeralConfig } from './numeral';

const CashFlowCart = ({ items, handleRemove }) => {
    console.log('items', items)
    return (
        <div>
            {items.length > 0 ? items.map((item) => (
                <div key={item._id}>
                     <h5>{item.name}</h5>
                     
                     {item.units && <small>Unidades: {item.units}</small>}
                     {item.kgs && <small>Kg: {item.kgs}</small>}
                     <IconButton onClick={() => handleRemove(item._id)} aria-label="remove"  size="small">
                            <RemoveShoppingCartIcon fontSize="inherit" />
                    </IconButton>
                </div>
            )) : <h4>Sem items adicionados ao carrinho</h4>}
        </div>
    )
}



export default CashFlowCart
