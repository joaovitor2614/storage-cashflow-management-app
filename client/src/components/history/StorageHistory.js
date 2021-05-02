import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { TabContent, a11yProps } from './Tab'
import { getSales } from '../../actions/sales';
import StorageHistoryDaily from './StorageHistoryDaily';
import { getSalesBalance } from './storage';
import StorageHistoryMonthly from './StorageHistoryMonthly';
import LoadingPage from '../LoadingPage';


const useStyles = makeStyles((theme) => ({
   panel: {

    width: '65rem',
    height: '985px'
   },
   tab: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#2d333b',
    color: '#adbabe'
   }
}))

const StorageHistory = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const salesState = useSelector(state => state.sales);
    const { loading, sales } = salesState;
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);
    // pegar balanço total de vendas
    const dailyBalance = getSalesBalance(sales.dailySales);
    const monthlyBalance = getSalesBalance(sales.monthlySales);
    useEffect(() => {
        dispatch(getSales())
    }, [])
    return (
        <div className='storage-history'>
            {loading === true ? <LoadingPage /> : (
                <div>
                    <AppBar  className={classes.panel} position="static">
                        <Tabs centered className={classes.tab} value={value} 
                        onChange={handleChange} aria-label="sales history">
                            <Tab label="Movimentação diária" {...a11yProps(0)} />
                            <Tab label="Movimentação mensal" {...a11yProps(1)} />
                        </Tabs>
                        <TabContent value={value} index={0}>
                        
                            <StorageHistoryDaily dailyBalance={dailyBalance} dailySales={sales.dailySales} />
                        </TabContent>
                        <TabContent value={value} index={1}>
                            <StorageHistoryMonthly monthlyBalance={monthlyBalance} monthlySales={sales.monthlySales} />
                        </TabContent>
                    </AppBar>
            </div>
            )}
        </div>
    )
}

export default StorageHistory
