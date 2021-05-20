import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBills } from '../../actions/bills'
import LoadingPage from '../LoadingPage'

const Bills = () => {
    const dispatch = useDispatch();
    const billsState = useSelector(state => state.bills);
    const { bills, bill, loading } = billsState
    useEffect(() => {
        dispatch(getBills())
    }, [])
    return loading ? (<LoadingPage />) : (
        <div>
            Bills
        </div>
    )
}

export default Bills
