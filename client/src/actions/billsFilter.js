export const filterBillDcp = (description) => ({
    type: 'FILTER_BILL_DCP',
    payload: description
})

export const filterBillClear = () => ({
    type: 'CLEAR_BILL_FILTER',
    
})