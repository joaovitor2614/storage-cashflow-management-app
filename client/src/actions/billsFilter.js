export const filterBillDcp = (description) => ({
    type: 'FILTER_BILL_DCP',
    payload: description
})

export const filterBillClear = () => ({
    type: 'CLEAR_BILL_FILTER',
    
})


export const filterBillDcpHistory = (description) => ({
    type: 'FILTER_BILL_DCP_HISTORY',
    payload: description
})

export const filterBillClearHistory = () => ({
    type: 'CLEAR_BILL_FILTER_HISTORY',
    
})

