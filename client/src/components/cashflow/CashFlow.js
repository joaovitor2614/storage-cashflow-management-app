import React from 'react'
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux'
import { updateItemComercial, findNameItem, removeItemComercial } from '../../actions/storage';

import CashFlowCart from './CashFlowCart';

import CashFlowQuery from './CashFlowQuery'
import { addSale } from '../../actions/sales';
import CashFlowForm from './CashFlowForm';
import { getTotalBalance } from './cash';
import CashFlowPagination from './CashFlowPagination';
import CashFlowCartPagination from './CashFlowCartPagination';
import { findNameClient, addHistorySale } from '../../actions/client'


const CashFlow = () => {
    const dispatch = useDispatch();
    // clientes achados por procura
    const clients = useSelector(state => state.client.clientsQuery)
    // items obtidos por procura
    const itemsFlow = useSelector(state => state.storage.itemsFlow);
    // items no carrinho
    const itemsCart = useSelector(state => state.storage.itemsComercial)

    // função para procurar produtos na base de dados por nome
    const handleQuery = (e) => {
        dispatch(findNameItem(e.target.value));
    }
    // função para procurar clients na base de dados por nome
    const handleClientQuery = (value) => {
        dispatch(findNameClient(value));
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
    const handleAddSale = (products, balance, paymentType, 
        selectedClient, setSelectedClient) => {
        console.log('handle sales')
        dispatch(addSale({ products, balance, paymentType }))
        if (selectedClient !== null) {
            dispatch(addHistorySale(selectedClient, { products, balance, paymentType}));
            setSelectedClient(null);
        }
      
    }
    const balance = getTotalBalance(itemsCart)
   
    return (
        <div className="cashflow-bg">
            <Paper elavation={2} className="cashflow-page">
        
                
                <div className="cashflow-page__group">
                
                    <div className="cashflow-page__group-query">
                        <CashFlowQuery handleQuery={handleQuery} />
                    </div>          
                    <div className="cashflow-page__group-list">
                        
                        {itemsFlow.length > 0 ? <CashFlowPagination items={itemsFlow} handleAdd={handleAdd} />
                        : <h4>Items não foram encontrados para esse nome</h4>}
                    </div>
                    
                
                </div>
                <div className="cashflow-page__group-cart">
                    <span className="cashflow-page__group-cart-form">
                        <CashFlowForm items={itemsCart} 
                        balance={balance} 
                        handleAddSale={handleAddSale}
                        clients={clients}
                        handleClientQuery={handleClientQuery}
                        />
                    </span>
                    <CashFlowCartPagination items={itemsCart} handleRemove={handleRemove} />
                    
                    
                </div>
                
                
                
                
            
            </Paper>
        </div>
        
    )
}

export default CashFlow
