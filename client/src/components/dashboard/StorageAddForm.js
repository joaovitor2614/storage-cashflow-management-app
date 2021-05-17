import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import numeral from 'numeral'
// schema 
import itemSchema from '../../validation/itemSchema'
// material ui
import MyTextField from '../custom fields/MyTextField'
import MySelectField from '../custom fields/MySelectField'
import Button from '@material-ui/core/Button';
import { useStorageForm } from '../../styles/components/storage/useStorage';
import { getKgPrice, getUnitPrice } from '../cashflow/cash'





const StorageAddForm = ({ handleSubmit, handleClose, data = '' }) => {
 
    const classes = useStorageForm();
    const initialValues = {
        name: data ? data.name : '',
        weight: data ? data.weight : '',
        category: data ? data.category : '',
        validity: data ? data.validity : '',
        pricePerUnit: data ? parseFloat(data.vU.replace("R$", "")) : '',
        storageAmount: data ? data.qE : '',
        profitUnit: data ? parseFloat(data.profitUnit.replace("%", "")) : '',
        profitKg: data ? parseFloat(data.profitKg.replace("%", "")) : ''
    }
    // alterar para mostrar ou não input do lucro por kg
    const handleSwitch = () => setIsKg(!isKg);
    const unitPrice = (values) => {
        // colocando peso do formulário como peso original dinamicamente
         values.originalWeight = values.weight
         return getUnitPrice(values);
    }
    const kgPrice = (values) => {
        return getKgPrice(values)
    }

    return (
        <div>
            <Formik
              validateOnChange={true}
              initialValues={initialValues}
              validationSchema={itemSchema}
              onSubmit={(values, { setSubmitting}) => {
                setSubmitting(true);
               
                handleSubmit(values, data !== '' ? data.id : '')
                handleClose();
                setSubmitting(false);
            }}
            >
               {({ errors, values, touched, isValid, dirty, isSubmitting, handleChange}) => (
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
                       

                        
                       

                     
                       
                         
                         
                        

                        <div className={classes.actions}>
                            <Button disabled={!(isValid && dirty)  || isSubmitting} 
                            variant="contained" type="submit" color="primary">
                                Atualizar estoque
                            </Button>
                            <div className={classes.prices}>
                                <h4>Preço Venda Quilo: {numeral(kgPrice(values)).format('$0,0.00')}
                                </h4>
                                <h4>Preço Venda Unidade: {numeral(unitPrice(values)).format('$0,0.00')}
                                </h4>
                            </div>
                        </div>
                        

                   </Form>
                   
               )}

            </Formik>

        </div>
    )
}

export default StorageAddForm
