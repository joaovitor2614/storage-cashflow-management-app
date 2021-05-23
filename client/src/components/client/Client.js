import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getClients } from '../../actions/client';
import ClientTable from './table/ClientTable';
import LoadingPage from '../LoadingPage'
import { Grid, makeStyles,  } from '../material-ui/material-ui'
import ClientTop from './ClientTop';


const Client = () => {
   
    const history = useHistory();
    const dispatch = useDispatch();
    const clientState = useSelector(state => state.client);
    const filters = useSelector(state => state.clientFilter)
    const { clients } = clientState;

    useEffect(() => {
        dispatch(getClients())
    }, [])
    return (
        <Grid container alignItems='center' justify='center' >
            <Grid item xs='auto'>
                {clients.length > 0 ? (
                    <>
                        
                        <ClientTop clients={clients} filters={filters} />
                        <ClientTable clients={clients} filters={filters} />
                    </>
                ) : <LoadingPage />}
            </Grid>
            
            
        </Grid>
    )
}

export default Client
