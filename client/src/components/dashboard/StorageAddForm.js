import React, { useState } from 'react'
import { Formik, Form } from 'formik';
// schema 
import itemSchema from '../../validation/itemSchema'
// material ui
import MyTextField from '../custom fields/MyTextField'
import MySelectField from '../custom fields/MySelectField'
import Button from '@material-ui/core/Button';
import { useStorageForm } from '../../styles/components/storage/useStorage';





const StorageAddForm = ({ handleSubmit, handleClose, data = '' }) => {
    console.log(data)
    const classes = useStorageForm();
    const initialValues = {
        name: data ? data.name : '',
        weight: data ? data.weight : '',
        category: data ? data.category : '',
        validity: data ? data.validity : '',
        pricePerUnit: data ? data.vU : '',
        storageAmount: data ? data.qE : '',
        profitUnit: data ? data.profitUnit : '',
        profitKg: data ? data.profitKg : ''
    }
    // alterar para mostrar ou não input do lucro por kg
    const handleSwitch = () => setIsKg(!isKg)
    return (
        <div>
            <Formik
              validateOnChange={true}
              initialValues={initialValues}
              validationSchema={itemSchema}
              onSubmit={(values, { setSubmitting}) => {
                setSubmitting(true);
                console.log(values);
                handleSubmit(values, data !== '' ? data.id : '')
                handleClose();
                setSubmitting(false);
            }}
            >
               {({ errors, touched, isValid, dirty, isSubmitting, handleChange}) => (
                   <Form>
                        <div className={classes.group}>
                            <MyTextField name="name" placeholder="Insira nome do produto" id="input-name" label="* Título" />
                            <MySelectField name="category" id="input-category" label="* Categoria" />

                            <MyTextField type='number' name="weight" placeholder="Insira peso do produto por quilogramas..." 
                            id="input-kg" label="Peso(kg)" />
                        </div>
                        <div className={classes.group}>
                            <MyTextField name="validity" type="date" placeholder="Insira data de validade do produto..." 
                            id="input-validity" label="Validade" />

                            <MyTextField name="pricePerUnit" 
                            
                            placeholder="0.00"   type='number'
                            id="input-pricePU" label="* Preço de fábrica(unid.)" />

                            <MyTextField type='number' name="storageAmount"  
                            placeholder="Insira quantidade de unidades a serem adicionadas..." 
                            id="input-sA" label="* Unidade de items" />
                        </div>
                        <div className={classes.group}>

                            <MyTextField type='number' name="profitUnit"  placeholder="Insira lucro por unidade" 
                            id="input-lu" label="Lucro por unidade(%)"  />
                            <MyTextField name="profitKg"  placeholder="Insira lucro por kg" 
                            id="input-lkg" type='number' label="Lucro por KG(%)" />
                        </div>

                        
                       

                     
                       
                         
                         
                        

                       
                        <Button disabled={!(isValid && dirty)  || isSubmitting} 
                        variant="contained" type="submit" color="primary">
                            Atualizar estoque
                        </Button>
                   </Form>
                   
               )}

            </Formik>

        </div>
    )
}

export default StorageAddForm
