import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText} from 'react-sidebar-ui'
import StorageIcon from '@material-ui/icons/Storage';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLinks = (link) => {
        setIsOpen(true);
          history.push(`/${link}`)
        

    }
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
