import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { getBillById, editBill } from '../../actions/bills';
import { Paper } from '../material-ui/material-ui'
import LoadingPage from '../LoadingPage';
import BillForm from './BillForm'

const EditBill = ({ match }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const billsState = useSelector(state => state.bills);
    const { bill, loading } = billsState
    const handleSubmit = (data, id='') => {
        dispatch(editBill(id, data))
        history.push('/bills')
        
    }
    useEffect(() => {
        const getData = () => {
            dispatch(getBillById(match.params.id));
        }
        getData();
        return () => getData;
    }, [])
    return loading ? (<LoadingPage />) : (
    <div>
        <Paper elevation={2}>
            <h3>Editar conta a pagar</h3>
            <BillForm edit={true} handleSubmit={handleSubmit} bill={bill}/>

        </Paper>
    </div>
    )
}

export default EditBill
