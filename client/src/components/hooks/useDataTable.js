import { useState, useEffect } from 'react'
import getStorage from '../../selectors/storage';


const createData = (name, category, weight, vU, qE, validity, profitUnit, profitKg, id) => {
   
    return { name, category, weight, vU, qE, validity, profitUnit, profitKg, id }
}


const useDataTable = (items, filters) => {
    const [rows, setRows] = useState([]);
    
    
    useEffect(() => {
        const updateRows = (items, setRows) => {
            const products = []
            const itemsData = getStorage(items, filters)
            itemsData.forEach((item) => {
                
                let data = createData(item.name, item.category, item.weight, item.pricePerUnit, 
                    item.storageAmount, item.validity, item.profitUnit, item.profitKg, item._id);
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