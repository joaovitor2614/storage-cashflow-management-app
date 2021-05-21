
import React, { useState, useRef, useEffect } from 'react'
import { Button, TextField, Popper, ClickAwayListener, 
    MenuList, MenuItem, Paper, Grow, SearchIcon, InputAdornment } from '../material-ui/material-ui'

const CashFlowClient = ({ clients, handleClientQuery, setSelectedClient }) => {
    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
}
    const handlelistKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false)
        }
    }
    const handleSelect = (selected) => {
        setSelectedClient({ ...selected })
        setOpen(false)
    }
    const prevOpen = useRef(open);
    useEffect(() => {
        
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        const trackClients = () => {
            prevOpen.current = open;
            handleClientQuery(value)
            if (value === '') {
                setOpen(false)
            }
            if (clients.length > 0) {
                setOpen(true)
            }
            if (!clients.length > 0) {
                setOpen(false)
            }
        }
        trackClients();
        return () => trackClients;

    }, [open, setOpen, value])
    return (
        <div>
            <TextField ref={anchorRef} 
            aria-controls={open ? 'menu-list-grow' : undefined}
            placeholder='Procurar cliente...'
            aria-haspopup="true"
            value={value}
                onChange={(e) => setValue(e.target.value)}
                InputProps={{
                    endAdornment: 
                    <InputAdornment position="end">
                <SearchIcon></SearchIcon></InputAdornment>
                }}
            />
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                  <Grow  {...TransitionProps}   
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                      <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow" 
                          onKeyDown={handlelistKeyDown}>
                                {clients.length > 0 && clients.map((client) => (
                                    <MenuItem onClick={() => handleSelect(client)} 
                                    key={client._id}>
                                        {client.name}
                                    </MenuItem>
                                ))}
                             
                          </MenuList>
                      </ClickAwayListener>
                      </Paper>
                  </Grow>
              )}
            </Popper>
        </div>
    )
}

export default CashFlowClient
