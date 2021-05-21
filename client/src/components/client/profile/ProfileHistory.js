import React from 'react'
import LoadingPage from '../../LoadingPage'

const ProfileHistory = ({ history, loading, }) => {
   
    return loading ? <LoadingPage /> : (
        <div>
            <h1>Histórico de compras</h1>
        </div>
    )
}

export default ProfileHistory
