import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import numeral from 'numeral'
import { numeralConfig } from './numeral';

const CashFlowCart = ({ items, handleRemove }) => {
    console.log('items', items)
    return (
        <div className="cashflow-page__group-cart__list">
            {items.length > 0 ? items.map((item) => (
                <div className="cashflow-page__group-cart__list-item" key={item._id}>
                    <div className="cashflow-page__group-cart__list-item__header">
                        <h5>{item.name}</h5>
                        <IconButton onClick={() => handleRemove(item._id)} 
                        aria-label="remove"  size="small">
                                <RemoveShoppingCartIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                     
                     
                     {item.units && <small>Unidades: {item.units}</small>}
                     {item.kgs && <small>Kg: {item.kgs}</small>}
                     
                </div>
            )) : <h4>Sem items adicionados ao carrinho</h4>}
        </div>
    )
}



export default CashFlowCart
