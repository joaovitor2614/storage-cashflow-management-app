
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeClient } from '../../../actions/client'
import { DeleteIcon, IconButton, EditIcon } from '../../material-ui/material-ui'

const OperationsBtn = ({ id }) => {
    
    const history = useHistory();
    const dispatch = useDispatch()
    // remover item
    const handleRemoveClient = (id) => {
        dispatch(removeClient(id))
    }
    // redirecionar para editar cadastro de client
    const handleRedirect = (id) => {
        history.push(`/update-client/${id}`)
    }
    return (
        <div className='client__table-operations'>
            <IconButton onClick={() => handleRemoveClient(id)}>
                <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleRedirect(id)}>
                <EditIcon />
            </IconButton>
        </div>
    )
}

export default OperationsBtn
