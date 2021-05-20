  
import * as yup from 'yup';

function requiredMsg(msg) {
   return `${msg} é necessário`
}



const billsSchema = yup.object().shape({
    value: yup.string().required(requiredMsg('Valor')),
    forDate: yup.string().required('Data de pagamento é necessária'),
    description: yup.string().required(requiredMsg('Motivo')),

})

export default billsSchema
