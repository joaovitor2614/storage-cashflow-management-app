import React from 'react'
import StorageHistoryTable from './StorageHistoryTable'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import numeral from 'numeral'

const StorageHistoryMonthly = ({ monthlySales, monthlyBalance}) => {
    console.log('month', monthlySales)
    return (
        <div className='storage-history__monthly'>
            <div  className='storage-history__balance'>
                <AttachMoneyIcon />
                <h2>Balanço total do mês {numeral(monthlyBalance).format('$0,0.00')}</h2>
          
            </div>
             <div className='storage-history__table'>
                <h2>Registro de produtos vendidos do mês</h2>
                <StorageHistoryTable itemSales={monthlySales} type='monthly' />
            </div>
            
        </div>
    )
}

export default StorageHistoryMonthly
