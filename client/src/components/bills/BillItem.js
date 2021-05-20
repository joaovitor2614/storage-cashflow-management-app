import React from 'react'
import numeral from 'numeral'
import dayjs from 'dayjs'
const BillItem = ({ bill }) => {
    const [open, setOpen] = false
    const editedAt = (
        <>
        {bill.editedAt && <h4>Criado em {dayjs(bill.Date).format('LLL')}</h4>}
        </>
        )
    return (
        <div>
            <h3>Valor: {numeral(bill.value).format('$0,0.00')}</h3>
            <h4>Criado em {dayjs(bill.Date).format('LLL')}</h4>
            {editedAt}
        </div>
    )
}

export default BillItem
