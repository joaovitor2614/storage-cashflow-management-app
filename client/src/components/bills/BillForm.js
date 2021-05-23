import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Button, Grid, makeStyles } from '../material-ui/material-ui'
import MyTextField from '../custom fields/MyTextField';
import billsSchema from '../../validation/billsSchema';
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)


const useStyles = makeStyles((theme) => ({
    root: {
       flexGrow: 1,
       display: 'flex',
       flexDirection: 'column'
  
    },
}))

const BillsForm = ({ edit, handleSubmit, bill=''}) => {
    const classes = useStyles()
    const getPrice = (value) => {
        console.log(value)
        return value.$numberDecimal
    }
    return (
        <>
            <Grid container alignItems='center' justify='center'>
                <Grid item>
                    <Link to='/bills'>
                        <button className='button button--primary'>Voltar para painel de controle</button>
                    </Link>
                </Grid>
            </Grid>
           
            <Formik
                    validateOnChange={true}
                    initialValues={{
                        value: bill ? getPrice(bill.value) : '',
                        forDate: bill ? bill.forDate : '',
                        description: bill ? bill.description : '',
                        editedAt: bill ? bill.editedAt : '',
                    }}
                    validationSchema={billsSchema}
                    onSubmit={(values, { setSubmitting}) => {
                        setSubmitting(true);
                        if (edit) {
                            values.editedAt = dayjs();
                            handleSubmit(values, bill._id)
                            setSubmitting(false);
                        } else {
                            console.log('submit')
                            handleSubmit(values)
                            setSubmitting(false);
                        }
                    }}
                    >
                        {({   isValid, dirty, isSubmitting }) => (
                        <Form>
                            <Grid container alignItems='center' justify='center' 
                            className={classes.root} spacing={3}>
                                <Grid item xs='auto'>
                                    <MyTextField label='Valor' 
                                    placeholder='Insira valor da conta a pagar...' 
                                    name='value' id='bill-value' type='number' />
                                </Grid>
                                <Grid item xs='auto'>
                                    <MyTextField label='Data de pagamento' 
                                    placeholder='Insira data de pagamento...' 
                                    name='forDate' id='bill-forDate' type='date' />
                                </Grid>
                               
                               
                                
                                <Grid item xs='auto'>
                                    <MyTextField label='Motivo'
                                    
                                    placeholder='Insira motivo da conta a pagar...' 
                                    name='description' id='bill-description' 
                                    multiline rows={3} maxRows={4}/>
                                </Grid>
                                <Grid item xs='auto'>
                                    <Button type='submit' color='primary'  variant="contained"
                                    disabled={!(isValid && dirty)  || isSubmitting} >
                                        {edit ? 'Editar cadastro' : 'Cadastrar'}
                                    </Button>
                                </Grid>
                                
                               
                            </Grid>
                            
                        </Form>
                        )}
                    </Formik>
                </>

    )
}

export default BillsForm
