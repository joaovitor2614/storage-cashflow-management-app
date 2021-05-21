import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBills } from '../../actions/bills'
import { Grid } from '../material-ui/material-ui'
import LoadingPage from '../LoadingPage'
import BillList from './BillList'

const Bills = () => {
    const dispatch = useDispatch();
    const billsState = useSelector(state => state.bills);
    const { bills, bill, loading } = billsState
    useEffect(() => {
        dispatch(getBills())
    }, [])
    return loading ? (<LoadingPage />) : (
        <Grid container container alignItems='center' justify='center'>
            <Grid item xs='auto'>
                <BillList bills={bills} />
            </Grid>
            
        </Grid>
    )
}

export default Bills
