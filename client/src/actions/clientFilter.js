
// filtrar por nome
export const clientByName = (name) => ({
    type: 'FILTER_CLIENT_NAME',
    payload: name
})

// filtrar por quantidade em estoque
export const clientClearFilter = () => ({
    type: 'CLEAR_CLIENT_FILTER'

})