
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addClient } from '../../actions/client';
// material-ui
import { Paper, Grid , makeStyles } from '../material-ui/material-ui'
// components
import LoadingPage from '../LoadingPage'
import ClientForm from './ClientForm';

const useStyles = makeStyles((theme) => ({
    paper: {
       flexGrow: 1,
       padding: theme.spacing(3),
       marginTop: theme.spacing(4)
  
    }
}))


const AddClient = () => {
    const classes = useStyles()
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
        <Grid container container alignItems='center' justify='center' >
            <Grid item xs='auto'>
                <Paper elevation={2} className={classes.paper}>
                 
                 
                    <div style={{ textAlign: 'center'}}>
                        <h2>Cadastrar cliente</h2>
                        <h5>ou</h5>
                    </div>
                    <ClientForm edit={false} handleSubmit={handleSubmit}/>

                </Paper>
            </Grid>
          
        </Grid>
    )
}

export default AddClient
