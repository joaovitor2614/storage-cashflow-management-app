import { useState, useEffect } from 'react'
const createData = (balance, paymentType, productsAmount, date, products, history_id) => {
  
   return { balance, paymentType, productsAmount, date, products, history_id }
}



const useHistoryTable = (history) => {
   console.log('hook h', history)
    const [rows, setRows] = useState([])
    useEffect(() => {
         const updateRows = (history, setRows) => {
             const collection = [];
          
            
              history.forEach((purchase) => {
                const productsAmount = purchase.products.length;
                  let data = createData(
                      purchase.balance, purchase.paymentType, productsAmount, 
                      purchase.Date, purchase.products, purchase._id)
                   collection.unshift(data)
              })
              setRows([ ...collection])
         }
         updateRows(history, setRows);
         return () => updateRows;
    }, [history])
    console.log('rows', rows)
    return { rows }
}

export default useHistoryTable;