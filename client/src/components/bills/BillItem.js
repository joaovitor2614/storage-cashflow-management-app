import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { green } from '@material-ui/core/colors';
import numeral from 'numeral'
import dayjs from 'dayjs'

import { ArrowDownwardIcon, ArrowUpwardIcon, CheckIcon, Collapse, DeleteIcon, EditIcon, IconButton } from '../material-ui/material-ui'
const BillItem = ({ bill, handleRemove, handlePayBill }) => {
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const editedAt = (
        <div className='bill__list-item-edit'>
        {bill.editedAt && <small>Editado em {dayjs(bill.editedAt).format('L')}</small>}
        </div>
        )
        const paidAt = (
            <div className='bill__list-item-edit'>
            {bill.paidAt && <small>Pago em {dayjs(bill.paidAt).format('L')}</small>}
            </div>
            )
    // redicionar para pag de editar
    const handleRedirect = () => {
        history.push(`/edit-bill/${bill._id}`)
    }
    return (
        <div className='bill__list-item'>
            <div className='bill__list-item-header'>
                <p>Valor</p>
                <p>Data para pagar</p>
            </div>
            <div className='bill__list-item-info'>
                <h4>{numeral(bill.value.$numberDecimal).format('$0,0.00')}</h4>
                <h4>{dayjs(bill.forDate).format('L')}</h4>
               
            </div>
            <div className='bill__list-item-actions'>
                {bill.isPaid === true ? (
                        <div className='row'>
                            <CheckIcon style={{ color: green[500] }} />
                            <p>Paga</p>
                        </div>
                        
                    ) : (
                        <div className='row'>
                            <button 
                            onClick={() => handlePayBill(bill._id, bill)}
                            className='button button--primary'>
                                Registrar como pago
                            </button>
                        </div>
                    )}
               
                {bill.isPaid === false && (
                     <IconButton onClick={() => handleRedirect()}>
                        <EditIcon />
                     </IconButton>
                )}
                <IconButton onClick={() => handleRemove(bill._id, bill.isPaid)}>
                     <DeleteIcon />
                </IconButton>
                
            </div>
            <div className='bill__list-item-dates'>
                <small>Criado em {dayjs(bill.Date).format('L')}</small>
                {editedAt}
                {paidAt}
                <IconButton onClick={() => setOpen(!open)}>
                    {open ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </IconButton>
            </div>
            <div className='bill__list-item-description'>
                <Collapse in={open}>
                    <h4>Motivo: {bill.description}</h4>
                </Collapse>
            </div>
            
           
        </div>
    )
}

export default BillItem
