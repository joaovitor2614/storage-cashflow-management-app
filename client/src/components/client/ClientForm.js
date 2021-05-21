import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import MyTextField from '../custom fields/MyTextField';
import clientSchema from '../../validation/clientSchema';
import { Grid, Button, makeStyles } from '../material-ui/material-ui'

const useStyles = makeStyles((theme) => ({
    root: {
       flexGrow: 1,
  
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justify: 'center',
        alignItems: 'center',
    },
    child: {
        display: 'flex',
        flexDirection: 'row',
        margin: theme.spacing(4)
    },
    action: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }
}))

const ClientForm = ({edit, handleSubmit, client=''}) => {
    const classes = useStyles()
    return (
        <Formik
                validateOnChange={true}
                initialValues={{
                    name: client ? client.name : '',
                    phone: client ? client.phone : '',
                    cpf: client ? client.cpf : '',
                    address: client ? client.address : '',
                }}
                validationSchema={clientSchema}
                onSubmit={(values, { setSubmitting}) => {
                    setSubmitting(true);
                    handleSubmit(values, client._id)
                    setSubmitting(false);
                }}
                >
                    {({   isValid, dirty, isSubmitting }) => (
                       <Form>
                           <div className={classes.root}>
                                <Grid container className={classes.container} spacing={5}>
                                        <Grid xs='auto'  item className={classes.child}>
                                            <MyTextField label='Nome' placeholder='Insira nome do cliente....' 
                                                name='name' id='client-name' />
                                                <MyTextField label='CPF' placeholder='xxx.xxx.xxx-xx' 
                                                name='cpf' id='client-cpf' />
                                        </Grid>
                                        <Grid xs='auto' item className={classes.child}>
                                                <MyTextField label='Telefone' placeholder='(DDD) xxxx-xxxxx' 
                                                name='phone' id='client-phone' />
                                                <MyTextField label='Endereço' placeholder='Insira endereço do cliente....' 
                                                name='address' id='client-address' />
                                        </Grid>
                                        <Grid item className={classes.action}>
                                            <Button type='submit' color='primary' variant="contained"
                                            disabled={!(isValid && dirty)  || isSubmitting} >
                                                {edit ? 'Editar cadastrar' : 'Cadastro'}
                                            </Button> 
                                        </Grid>
                                        
                                        
                                        
                                </Grid>
                           </div>
                          
                       
                       </Form>
                    )}
                </Formik>

    )
}

export default ClientForm
