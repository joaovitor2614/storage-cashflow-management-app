import React from 'react'
import { Formik, Form, Field } from 'formik';
import salesSchema from '../../validation/salesSchema';
import MyTextField from '../custom fields/MyTextField';
import { MenuItem, Select, Button } from '../material-ui/material-ui'
import { useStorageForm } from '../../styles/components/storage/useStorage';

const StorageEditModal = ({ product, handleClose, handleEdit }) => {
   const classes = useStorageForm()
   console.log('product', product)
    return (
        <Formik
              validateOnChange={true}
              initialValues={{
                  name: product ? product.name : '',
                  units: product ? product.units : 0,
                  kgs: product ? product.kgs : 0,
                  paymentType: product ? product.paymentType : 'Método de pagamento',
                  date: product ? product.date : '',
                  id: product ? product._id : null,
                  product_id: product ? product.product_id : null
              }}
              validationSchema={salesSchema}
              onSubmit={(values, { setSubmitting}) => {
                setSubmitting(true);

                console.log(values);
                handleEdit(values.id, values.product._id, values)
                handleClose();
                setSubmitting(false);
            }}
            >
                {({ errors, touched, isValid, dirty, isSubmitting, handleChange}) => (
                       <Form>
                           <div className={classes.group}>
                               <MyTextField name='name' label='Produto' id="input-product" />
                               <MyTextField type='number' name='units' 
                               label='Unidade' id="input-units" />
                               <MyTextField type='number' name='kgs' 
                               label='Quilos' id="input-kgs" />
                           </div>
                           <div className={classes.group}>
                            
                            <Field name='paymentType' as={Select}>
                                <MenuItem value='Método de pagamento'>Método de pagamento</MenuItem>
                                <MenuItem value='À vista'>À vista</MenuItem>
                                <MenuItem value='Cartão crédito'>Crédito</MenuItem>
                                <MenuItem value='Cartão débito'>Débito</MenuItem>
                                <MenuItem value='PIX'>PIX</MenuItem>
                            </Field>
                            <MyTextField name='date' 
                            label='Data/hora' id="input-date" novalidate />
                           </div>
                           <Button disabled={!(isValid && dirty)  || isSubmitting} 
                            variant="contained" type="submit" color="primary">
                                Editar venda
                            </Button>
                       </Form>
                )}
            </Formik>
 
    )
}

export default StorageEditModal
