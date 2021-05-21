import React from 'react'
import dayjs from 'dayjs'
import { Formik, Form } from 'formik'
import { Button } from '@material-ui/core'
import MyTextField from '../custom fields/MyTextField';
import billsSchema from '../../validation/billsSchema';
const BillsForm = ({ edit, handleSubmit, bill=''}) => {
    const getPrice = (value) => {
        console.log(value)
        return value.$numberDecimal
    }
    return (
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
                           <MyTextField label='Valor' placeholder='Insira valor da conta a pagar...' 
                           name='value' id='bill-value' type='number' />
                           <MyTextField label='Data de pagamento' placeholder='Insira data de pagamento...' 
                           name='forDate' id='bill-forDate' type='date' />
                           <MyTextField label='Motivo' placeholder='Insira motivo da conta a pagar...' 
                           name='description' id='bill-description' 
                           multiline rows={3} maxRows={4}/>
                           
                           <Button type='submit' color='primary'
                           disabled={!(isValid && dirty)  || isSubmitting} >
                               {edit ? 'Cadastrar' : 'Editar cadastro'}
                           </Button>
                       </Form>
                    )}
                </Formik>

    )
}

export default BillsForm
