import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { getClientById, editClient } from '../../actions/client';
import { Paper, makeStyles, Grid } from '../material-ui/material-ui'
import LoadingPage from '../LoadingPage';
import ClientForm from './ClientForm'

const useStyles = makeStyles((theme) => ({
    paper: {
       flexGrow: 1,
       padding: theme.spacing(3),
       marginTop: theme.spacing(4)
  
    }
}))

const EditClient = ({ match }) => {
    const classes = useStyles()
    const history = useHistory();
    const dispatch = useDispatch();
    const clientState = useSelector(state => state.client);
    console.log('edit cliet', clientState)
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
    <Grid container container alignItems='center' justify='center'>
         <Grid item xs='auto'>
            <Paper elevation={2} className={classes.paper}>
                    <div style={{ textAlign: 'center'}}>
                        <h2>Editar dados do cliente</h2>
                        <h5>ou</h5>
                    </div>
                <ClientForm edit={true} handleSubmit={handleSubmit} client={client}/>

            </Paper>
         </Grid>
        
    </Grid>
    )
}

export default EditClient
