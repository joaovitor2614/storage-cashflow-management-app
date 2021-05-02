import React from 'react'
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux'
import { updateItemComercial, findNameItem, removeItemComercial } from '../../actions/storage';

import CashFlowCart from './CashFlowCart';
import CashFlowDisplay from './CashFlowDisplay';
import CashFlowQuery from './CashFlowQuery'
import { addSale } from '../../actions/sales';
import CashFlowForm from './CashFlowForm';
import { getTotalBalance } from './cash';



const CashFlow = () => {
    const dispatch = useDispatch();
    // items obtidos por procura
    const itemsFlow = useSelector(state => state.storage.itemsFlow);
    // items no carrinho
    const itemsCart = useSelector(state => state.storage.itemsComercial)

    // função para procurar produtos na base de dados por nome
    const handleQuery = (e) => {
        dispatch(findNameItem(e.target.value));
    }
    // função para adicionar item ao carrinho
    const handleAdd = (item, units = '', kgs = '', isKg, perKg, perUnit) => {
        if (isKg === true) {
            const perKgNumber = parseFloat(perKg, 10);
            const kgsNumber = parseFloat(kgs, 10);
            item = {
                kgs: kgsNumber,
                perKg: perKgNumber,
                ...item
            }
        } else {
            const perUnitNumber = parseFloat(perUnit, 10);
            const unitsNumber = parseFloat(units, 10);
            item = {
                units: unitsNumber,
                perUnit: perUnitNumber,
                ...item
            }
        }
        dispatch(updateItemComercial(item))
    }
    // função para remover item do carrinho
    const handleRemove = (id) => {
        dispatch(removeItemComercial(id))
    }
    const handleAddSale = (products, balance) => {
        console.log('handle sales')
        dispatch(addSale({ products, balance }))
    }
    const balance = getTotalBalance(itemsCart)
    return (
        <div className="cashflow-bg">
            <Paper elavation={2} className="cashflow-page">
        
                
                <div className="cashflow-page__group">
                
                    
                    <CashFlowQuery handleQuery={handleQuery} />
                    <div className="cashflow-page__group-list">
                        {itemsFlow.length > 0 ? itemsFlow.map((item) => (
                            <CashFlowDisplay item={item} key={item._id} handleAdd={handleAdd} />
                        )) : <h4>Items não foram encontrados para esse nome</h4>}
                    </div>
                    
                
                </div>
                <div className="cashflow-page__group-cart">
                    <CashFlowCart items={itemsCart} handleRemove={handleRemove} />
                    <span className="cashflow-page__group-cart-form">
                        <CashFlowForm items={itemsCart} balance={balance} handleAddSale={handleAddSale}/>
                    </span>
                    
                </div>
                
                
                
                
            
            </Paper>
        </div>
        
    )
}

export default CashFlow
