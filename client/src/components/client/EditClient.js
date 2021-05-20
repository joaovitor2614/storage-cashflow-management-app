import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { getClientById, editClient } from '../../actions/client';
import { Paper } from '../material-ui/material-ui'
import LoadingPage from '../LoadingPage';
import ClientForm from './ClientForm'

const EditClient = ({ match }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const clientState = useSelector(state => state.client);
    const { client, loading } = clientState
    const handleSubmit = (data, id='') => {
        dispatch(editClient(id, data))
        history.push('/client')
        
    }
    useEffect(() => {
        const getData = () => {
            dispatch(getClientById(match.params.id));
        }
        getData();
        return () => getData;
    }, [])
    return loading ? (<LoadingPage />) : (
    <div>
        <Paper elevation={2}>
            <h3>Cadastrar cliente</h3>
            <ClientForm edit={false} handleSubmit={handleSubmit} client={client}/>

        </Paper>
    </div>
    )
}

export default EditClient
