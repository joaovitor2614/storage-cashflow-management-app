import { useState, useEffect } from 'react'
import getStorage from '../../selectors/storage';
import { getKgPrice, getUnitPrice } from '../cashflow/cash';
import numeral from 'numeral'

const createData = (name, category, weight, vU, qE, priceKg, priceUnit,
     validity, profitUnit, profitKg, id) => {
   
    return { name, category, weight, vU, qE, priceKg, priceUnit,
         validity, profitUnit, profitKg, id }
}


const useDataTable = (items, filters) => {
    const [rows, setRows] = useState([]);
    
    
    useEffect(() => {
        const updateRows = (items, setRows) => {
            const products = []
            const itemsData = getStorage(items, filters)
           
            itemsData.forEach((item) => {
                let priceKg = getKgPrice(item);

                let priceUnit = getUnitPrice(item);
        
                let data = createData(item.name, item.category, item.weight, `R$${item.pricePerUnit}`, 
                    item.storageAmount, `${numeral(priceKg).format('$0,0.00')}`, `${numeral(priceUnit).format('$0,0.00')}`, item.validity, 
                    `${item.profitUnit}%`, `${item.profitKg ? `${item.profitKg}%` : ''}`, item._id);
                   
                products.unshift(data)
                
            });
            setRows([ ...products ])
            
            
        }
        updateRows(items, setRows);
        
        return () => updateRows;
    }, [items, filters])
    return { rows }
}


export default useDataTable