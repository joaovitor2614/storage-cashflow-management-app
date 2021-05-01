import { useState, useEffect } from 'react'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br' // carregar sob demanda

dayjs.locale('pt-br') // usar locale portugues globalmente

dayjs.extend(LocalizedFormat)


const createData = (name, units, date, _id) => {
   
    return { name, units, date, _id }
}


const useDataTableDaily = (items, type) => {
    const [rows, setRows] = useState([]);
 
    
    useEffect(() => {
        const updateRows = (itemsSales, setRows, type) => {
            const products = []
       
            itemsSales.forEach((sale) => {
             
                let date = sale.date
    
                sale.products.forEach((item) => {
                    console.log('type', type)
                    if (type === 'daily') {
                        let data = createData(item.name, item.units, dayjs(date).format('LT'), item._id);
                        products.unshift(data)
                    } else if (type === 'monthly') {
                       let data = createData(item.name, item.units, dayjs(date).format('L'), item._id);
                       products.unshift(data)
                    }
                
                    
                })
            })
            setRows([ ...products ])
            
               
        }
        updateRows(items, setRows, type);
        
        return () => updateRows;
    }, [items])
    return { rows }
}


export default useDataTableDaily