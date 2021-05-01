import React from 'react'
import StorageHistoryTable from './StorageHistoryTable'
import numeral from 'numeral'

const StorageHistoryMonthly = ({ monthlySales, monthlyBalance}) => {
    console.log('month', monthlySales)
    return (
        <div className='storage-history__monthly'>
             <div>
                <h2>Registro de produtos vendidos do mês</h2>
                <StorageHistoryTable itemSales={monthlySales} type='monthly' />
            </div>
            <div>
                <h2>Balanço total do mês</h2>
                <h4>Quantia: {numeral(monthlyBalance).format('$0,0.00')}</h4>
            </div>
        </div>
    )
}

export default StorageHistoryMonthly
