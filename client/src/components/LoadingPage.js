import React from 'react'
import loading from '../assets/loader.gif'
const LoadingPage = () => {
    return (
        <div className="loader">
            <div className="loader__group">
                <img className="loader__image" src={loading} />
                <h4>Carregando...</h4>
            </div>
        </div>
    )
}

export default LoadingPage
