import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addBill } from '../../actions/bills';
// material-ui
import { Paper, makeStyles, Grid } from '../material-ui/material-ui'
// components
import BillForm from './BillForm';

const useStyles = makeStyles((theme) => ({
    paper: {
       flexGrow: 1,
       padding: theme.spacing(3),
       marginTop: theme.spacing(4),
       marginBottom: '25px'
  
    }
}))



const AddBill = () => {
    const classes = useStyles()
    const history = useHistory();
     const dispatch = useDispatch();
     // adicionar client
     const handleSubmit = (data) => {
        dispatch(addBill(data));
        history.push('/bills')
    }
    
    return (
        <Grid container container alignItems='center' justify='center' >
            <Grid item xs='auto'>
                <Paper elevation={2} className={classes.paper}>
                    <div style={{ textAlign: 'center'}}>
                        <h3>Adicionar conta a pagar</h3>
                        <h5>ou</h5>
                    </div>

                    <BillForm edit={false} handleSubmit={handleSubmit}/>

                </Paper>
            </Grid>
           
        </Grid>
    )
}

export default AddBill
