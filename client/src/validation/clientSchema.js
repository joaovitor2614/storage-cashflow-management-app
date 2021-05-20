  
import * as yup from 'yup';

function requiredMsg(msg) {
   return `${msg} é necessário`
}

let phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/
let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
const clientSchema = yup.object().shape({
    name: yup.string().required(requiredMsg('Nome')),
    phone: yup.string().matches(phoneRegex, 'Insira um número de telefone válido'),
    cpf: yup.string().matches(cpfRegex, 'Insira um formato de cpf válido'),
    address: yup.string()
})

export default clientSchema