import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText} from 'react-sidebar-ui'
import { StorageIcon, BusinessCenterIcon, 
    AssessmentIcon, ExitToAppIcon, PeopleIcon, 
    PersonAddIcon, DashboardIcon, ReceiptIcon, 
    PostAddIcon, TimelineIcon} from '../material-ui/material-ui'
   
const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLinks = (link) => {
        setIsOpen(true);
          history.push(`/${link}`)
    }
    const addClient = (
        <Item classes='side-bar__item-2' onClick={() => handleLinks('add-client')} bgColor='black'>
        <PersonAddIcon />
        Cadastrar cliente
    </Item>
    )
    const dashboardClient = (
        <Item classes='side-bar__item-2' onClick={() => handleLinks('client')} bgColor='black'>
            <DashboardIcon />
            Dashboard
        </Item>
    )
    const dashboardBill = (
        <Item classes='side-bar__item-2' onClick={() => handleLinks('bills')} bgColor='black'>
            <DashboardIcon />
                Dashboard
        </Item>
    )
    const addBill = (
        <Item classes='side-bar__item-2' onClick={() => handleLinks('add-bill')} bgColor='black'>
             <PostAddIcon />
             Adicionar conta
        </Item>
    )
    const historyBill = (
        <Item classes='side-bar__item-2' onClick={() => handleLinks('bills-history')} bgColor='black'>
             <TimelineIcon />
             Histórico
        </Item>
    )
    return (
        <div>
            <Sidebar classes='side-bar' bgColor='black' isCollapsed={!isOpen}>
                <div className='side-bar__box'>
                
                    <Item classes='side-bar__item' onClick={() => handleLinks('storage')} bgColor='black'>
                        <StorageIcon />
                        Estoque
                    </Item>
                    <Item classes='side-bar__item' onClick={() => handleLinks('cashflow')} bgColor='black'>
                        <BusinessCenterIcon  />
                        Gerenciamento de caixa
                    </Item>
                    <Item classes='side-bar__item' onClick={() => handleLinks('storage-history')} bgColor='black'>
                        <AssessmentIcon  />
                        Movimentação de caixa
                    </Item>
                    <DropdownItem 
                    values={[dashboardBill, addBill, historyBill]}
                    bgColor={'black'}>
                         <div className='side-bar__menu'>
                            <ReceiptIcon />
                       
                            <p>Contas</p>
                         </div>
                         
                    </DropdownItem>
                    <DropdownItem 
                    values={[dashboardClient, addClient]}
                    bgColor={'black'}>
                        <div className='side-bar__menu'>
                            <PeopleIcon />
                            <p>  Clientes</p>
                        </div>
                        
                    </DropdownItem>
                   
                    <Item classes='side-bar__item' onClick={() => dispatch({ type: 'LOGOUT' })}bgColor='black'>
                        <ExitToAppIcon />
                        Logout
                    </Item>
                </div>
                
              
            </Sidebar>
        </div>
    )
}

export default SideBar
