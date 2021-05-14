  
import * as yup from 'yup';

let requiredText = 'Esse campo é necessário'

const salesSchema = yup.object().shape({
    name: yup.string().required(requiredText),
    kgs: yup.number('Quilo deve ser númerico'),
    units: yup.number('Unidade deve ser númerica'),
    paymentType: yup.string().required(requiredText),
    date: yup.string().required(requiredText)

})

export default salesSchema