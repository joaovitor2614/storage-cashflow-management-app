import React from 'react'

const ProfileTop = ({ client }) => {
    const cpf = (client.cpf && <h3>CPF: {client.cpf}</h3>)
    const phone = (client.phone && <h3>Telefone: {client.phone}</h3>)
    const address = (client.address && <h3>Endereço: {client.address}</h3>)
    return (
        <div>
            <div>
                <h1>Nome: {client.name}</h1>
                {phone}
            </div>
            <div>
                {cpf}
                {address}
            </div>
        </div>
    )
}

export default ProfileTop
