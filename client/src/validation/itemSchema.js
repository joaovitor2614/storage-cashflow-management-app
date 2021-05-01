  
import * as yup from 'yup';


const itemSchema = yup.object().shape({
    name: yup.string().required('Nome do produto é necessário'),
    category: yup.string().required('Categoria do produto é necessária'),
    weight: yup.number('Peso deve um número')
    .positive('Peso deve ser um número maior que 0'),
    

    pricePerUnit: yup.number('Preço de fábrica(unid.) deve ser um número')
    .required('Preço de fabrica(unid.) do produto é necessário')
    .positive('Preço de fábrica(unid.) deve ser um número maior que 0'),
  
    
    

    storageAmount: yup.number('Quantidade a adicionar deve um número')
    .positive('Quantidade a adicionar deve ser um número maior que 0')
    .required('Quantidade a adicionar é necessária'),
    profitKg: yup.number('Preço por kg deve um número'),
    profitUnit: yup.number('Preço por unidade deve um número'),
})

export default itemSchema