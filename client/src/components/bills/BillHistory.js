import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { filterBillDcpHistory, filterBillClearHistory } from '../../actions/billsFilter'
import { useSelector, useDispatch } from 'react-redux'
import { getBills } from '../../actions/bills';
import selectBillsHistory from '../../selectors/billsHistory'
import LoadingPage from '../LoadingPage';
import { Grid } from '../material-ui/material-ui'
import BillList from './BillList'
import BillsActions from './BillsActions';

const BillHistory = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: 'CLEAR_BILL_FILTER' })
        dispatch(getBills())
    }, [])
    const billsState = useSelector(state => state.bills);
    const filters = useSelector(state => state.billsFilter);

    const { history, loading } = billsState;
    return loading ? <LoadingPage /> : (
        <Grid container  alignItems='center' justify='center'>
           
                
           
            <Grid item xs='auto'>
                <Link to='/bills'>
                    <button className='button button--primary button--mtb-l'>Ir para Dashboard</button>
                </Link>
                <BillsActions />
                <BillList bills={history} selectBills={selectBillsHistory}/>
            </Grid>
        </Grid>
    )
}

export default BillHistory
