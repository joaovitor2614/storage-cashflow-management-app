import OperationsBtn from "./OperationsBtn"


const columns = [
    { id: 'name', label: 'Nome', align:'left', minWidth: 110 },
    { id: 'cpf', label: 'CPF', minWidth: 110, align: 'center' },
    { id: 'phone', label: 'Telefone', align: 'center', minWidth: 70 },
    { id: 'address', label: 'Endereço',  minWidth: 140, align: 'center'},
    { id: 'operations', label: 'Operações', renderCell: OperationsBtn,
     disableClickEventBubbling: true, align: 'right', minWidth: 90 },
]


export default columns