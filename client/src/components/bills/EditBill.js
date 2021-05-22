import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { getBillById, editBill } from '../../actions/bills';
import { Paper, makeStyles, Grid } from '../material-ui/material-ui'
import LoadingPage from '../LoadingPage';
import BillForm from './BillForm'

const useStyles = makeStyles((theme) => ({
    paper: {
       flexGrow: 1,
       padding: theme.spacing(3),
       marginTop: theme.spacing(4),
       marginBottom: '25px'
  
    }
}))

const EditBill = ({ match }) => {
    const classes = useStyles();
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
    return loading || bill.value === undefined ? (<LoadingPage />) : (
    <Grid container container alignItems='center' justify='center'>
        <Grid item xs='auto'>
            <Paper elevation={2} className={classes.paper}>
                <div style={{ textAlign: 'center'}}>
                        <h3>Editar conta a pagar</h3>
                        <h5>ou</h5>
                    </div>
             
                <BillForm edit={true} handleSubmit={handleSubmit} bill={bill}/>

            </Paper>
        </Grid>
        
    </Grid>
    )
}

export default EditBill
