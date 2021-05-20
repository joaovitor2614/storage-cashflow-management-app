
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addClient } from '../../actions/client';
// material-ui
import { Paper } from '../material-ui/material-ui'
// components
import LoadingPage from '../LoadingPage'
import ClientForm from './ClientForm';


const AddClient = () => {
    const history = useHistory();
     const dispatch = useDispatch();
     const clientState = useSelector(state => state.client);
     const { loading } = clientState
     // adicionar client
     const handleSubmit = (data, id='') => {
        dispatch(addClient(data));
        history.push('/client')
    }
    
    return (
        <div>
            <Paper elevation={2}>
                <h3>Cadastrar cliente</h3>
                <ClientForm edit={false} handleSubmit={handleSubmit}/>

            </Paper>
        </div>
    )
}

export default AddClient
