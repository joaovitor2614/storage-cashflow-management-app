import { useState, useEffect } from 'react'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br' // carregar sob demanda
dayjs.locale('pt-br') // usar locale portugues globalmente
dayjs.extend(LocalizedFormat)

const createData = (balance,  paymentType, productsAmount, date, products, _id ) => {
    return { balance,  paymentType, productsAmount, date, products, _id }
}


const useDataTableDaily = (items, type) => {
    const [rows, setRows] = useState([]);
 
    
    useEffect(() => {
        const updateRows = (itemsSales, setRows, type) => {
            const products = []
       
            itemsSales.forEach((sale) => {              
                    if (type === 'daily') {
                        let data = createData(sale.balance, sale.paymentType, sale.products.length,
                            dayjs(sale.date).format('LT'), sale.products, sale._id) 
               
                  
                      
                        products.unshift(data)
                    
                    } else if (type === 'monthly') {
                        let data = createData(sale.balance, sale.paymentType, sale.products.length,
                            dayjs(sale.date).format('L'), sale.products, sale._id) 
                        products.unshift(data)
                    }
                
                    
                
            })
            setRows([ ...products ])
            
               
        }
        updateRows(items, setRows, type);
        
        return () => updateRows;
    }, [items])
    return { rows }
}


export default useDataTableDaily