import React from 'react'
import dayjs from 'dayjs'
import numeral from 'numeral'

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StorageHistoryTable from './StorageHistoryTable';


const StorageHistoryDaily = ({ dailySales, dailyBalance }) => {

   
    return (
        <div className='storage-history__daily'>
            <div  className='storage-history__balance'>
                <AttachMoneyIcon />
                <h2>Balanço total do dia {numeral(dailyBalance).format('$0,0.00')}</h2>
             
            </div>
            <div className='storage-history__table'>
                <h2>Registro de produtos vendidos do dia</h2>
                <StorageHistoryTable itemSales={dailySales} type='daily' />
            </div>
            

        </div>
            
    )
}

export default StorageHistoryDaily
