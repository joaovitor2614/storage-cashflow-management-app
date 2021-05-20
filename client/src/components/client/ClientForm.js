import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { Button } from '@material-ui/core'
import MyTextField from '../custom fields/MyTextField';
import clientSchema from '../../validation/clientSchema';
const ClientForm = ({edit, handleSubmit, client=''}) => {
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
                           <MyTextField label='Nome' placeholder='Insira nome do cliente....' 
                           name='name' id='client-name' />
                           <MyTextField label='CPF' placeholder='xxx.xxx.xxx-xx' 
                           name='cpf' id='client-cpf' />
                           <MyTextField label='Telefone' placeholder='(DDD) xxxx-xxxxx' 
                           name='phone' id='client-phone' />
                           <MyTextField label='Endereço' placeholder='Insira endereço do cliente....' 
                           name='address' id='client-address' />
                           <Button type='submit' color='primary'
                           disabled={!(isValid && dirty)  || isSubmitting} >
                               {edit ? 'Cadastrar' : 'Editar cadastro'}
                           </Button>
                       </Form>
                    )}
                </Formik>

    )
}

export default ClientForm
