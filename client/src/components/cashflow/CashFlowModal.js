import React from 'react'
import { useStorageModal } from '../../styles/components/storage/useStorage'
import { Modal, Fade, IconButton, CloseIcon, 
    Backdrop, SearchIcon, InputAdornment, 
    TextField, HighlightOffIcon } from '../material-ui/material-ui'
import CashFlowClient from './CashFlowClient';
const CashFlowModal = ({ open, handleClose, setOpen, 
    handleClientQuery, clients, setSelectedClient }) => {
    const classes = useStorageModal();
    const handleClient = (client) => {
        setSelectedClient(client);
        setOpen(false)
    }
    return (
        <Modal
        aria-labelledby="add-item"
        aria-describedby="add-item-storage"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
          }}
        >
            <Fade in={open}>
                <div className={classes.paper}
                >
                    <div className={classes.header}>
                        <h2>Selecionar cliente</h2>
                     
                        <IconButton onClick={() => setOpen(false)} aria-label="close"  size="medium">
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                        
                    </div>
                    <div className='cashflow-page__group-cart-form__box-content-utils'>
                    <TextField 
                        id="name-filter" style={{ margin: 8 }} 
                        className={classes.input}
                        placeholder="Procurar cliente" margin="normal" variant="outlined"
                        onChange={(e) => handleClientQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">
                                                <SearchIcon></SearchIcon>
                                        </InputAdornment>
                        
                        }}
                        />
                         <IconButton onClick={() => setSelectedClient(null)} 
                        disableRipple  disableFocusRipple size='small' 
                        style={{ backgroundColor: "transparent", padding: 0, margin: 0 }}>
                            <HighlightOffIcon className={classes.Icon} />
                        </IconButton>
                    </div>
                    <div>
                        <CashFlowClient clients={clients} handleClient={handleClient} />
                    </div>
                    
                </div>
             
            </Fade>

        </Modal>
  
    )
}

export default CashFlowModal
