import { Item } from 'react-sidebar-ui'
import React from 'react'


export const ClientDashBoard = ({ handleLinks }) => {
    return (
        <Item classes='side-bar__item' onClick={() => handleLinks('client')} bgColor='black'>
            <DashboardIcon />
            Dashboard   
        </Item>
    )
}


export const ClientAdd = ({ handleLinks }) => {
    return (
        <div classes='side-bar__item' onClick={() => handleLinks('add-client')} bgColor='black'>
            <PersonAddIcon />
            Cadastrar cliente 
        </div>
    )
}