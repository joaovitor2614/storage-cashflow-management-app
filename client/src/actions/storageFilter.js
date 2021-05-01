

// filtrar por nome
export const storageByName = (name) => ({
    type: 'FILTER_NAME',
    payload: name
})

// filtrar por categoria
export const storageByCategory = (category) => ({
    type: 'FILTER_CATEGORY',
    payload: category
})

// filtrar por valor unitário
export const storageByVu = (vU) => ({
    type: 'FILTER_VU',
    payload: vU
})


// filtrar por quantidade em estoque
export const storageByQe = (qE) => ({
    type: 'FILTER_QE',
    payload: qE
})

// filtrar por quantidade em estoque
export const clearFilter = () => ({
    type: 'CLEAR_FILTER'

})