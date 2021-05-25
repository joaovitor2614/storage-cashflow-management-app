import React, { useEffect } from 'react'
import { filterBillDcp, filterBillClear } from '../../actions/billsFilter'
import { useDispatch, useSelector } from 'react-redux'
import { getBills, payBill } from '../../actions/bills'
import selectBills from '../../selectors/bills'
import { Grid, AddIcon, Fab, Tooltip } from '../material-ui/material-ui'
import LoadingPage from '../LoadingPage'
import BillList from './BillList'
import BillsActions from './BillsActions'
import { Link } from 'react-router-dom'

const Bills = () => {

    const dispatch = useDispatch();
    const billsState = useSelector(state => state.bills);
    const filters = useSelector(state => state.billsFilter)
    const handlePayBill = (id, item) => {
        dispatch(payBill(id, item))
    }
    const { bills, bill, loading } = billsState
    useEffect(() => {
        dispatch({ type: 'CLEAR_BILL_FILTER' })
        dispatch(getBills())
    }, [])
    return loading ? (<LoadingPage />) : (
        <Grid container container alignItems='center' justify='center'>
            <Grid item xs='auto'>
               <Link to='/bills-history'>
                    <button  className='button button--third button--mtb-l'>
                        Ir para histórico
                    </button>
                </Link>
                <BillsActions 
                
               />
                
                <BillList bills={bills} selectBills={selectBills} 
                handlePayBill={handlePayBill} />
            </Grid>
            
        </Grid>
    )
}

export default Bills
