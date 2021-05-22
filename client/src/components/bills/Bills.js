import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getBills } from '../../actions/bills'

import { Grid, AddIcon, Fab, Tooltip } from '../material-ui/material-ui'
import LoadingPage from '../LoadingPage'
import BillList from './BillList'
import BillsActions from './BillsActions'

const Bills = () => {

    const dispatch = useDispatch();
    const billsState = useSelector(state => state.bills);
    const filters = useSelector(state => state.billsFilter)
    const { bills, bill, loading } = billsState
    useEffect(() => {
        dispatch(getBills())
    }, [])
    return loading ? (<LoadingPage />) : (
        <Grid container container alignItems='center' justify='center'>
            <Grid item xs='auto'>
                <BillsActions />
                <BillList filters={filters} bills={bills} />
            </Grid>
            
        </Grid>
    )
}

export default Bills
