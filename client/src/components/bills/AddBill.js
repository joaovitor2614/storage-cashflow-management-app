import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addBill } from '../../actions/bills';
// material-ui
import { Paper } from '../material-ui/material-ui'
// components
import BillForm from './BillForm';


const AddBill = () => {
    const history = useHistory();
     const dispatch = useDispatch();
     // adicionar client
     const handleSubmit = (data) => {
        dispatch(addBill(data));
        history.push('/bills')
    }
    
    return (
        <div>
            <Paper elevation={2}>
                <h3>Adicionar conta a pagar</h3>
                <BillForm edit={false} handleSubmit={handleSubmit}/>

            </Paper>
        </div>
    )
}

export default AddBill
