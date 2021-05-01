import React from 'react'
import dayjs from 'dayjs'
import numeral from 'numeral'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

import StorageHistoryTable from './StorageHistoryTable';


const StorageHistoryDaily = ({ dailySales, dailyBalance }) => {
    console.log(dailySales)
    console.log(dailyBalance)
   
    return (
        <div className='storage-history__daily'>
            <div>
                <h2>Registro de produtos vendidos do dia</h2>
                <StorageHistoryTable itemSales={dailySales} type='daily' />
            </div>
            <div>
                <h2>Balanço total do dia</h2>
                <h4>Quantia: {numeral(dailyBalance).format('$0,0.00')}</h4>
            </div>

        </div>
            
    )
}

export default StorageHistoryDaily
