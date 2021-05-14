import React from 'react'
import { useStorageModal } from '../../styles/components/storage/useStorage';
import { Paper, Modal, Backdrop, Fade, IconButton, CloseIcon } from '../material-ui/material-ui'
import StorageEditModal from './StorageEditModal';
const StorageModal = ({ open, handleClose, product, handleEdit }) => {
    const classes = useStorageModal();
    return (
        <Modal
            aria-labelledby="edit-sale"
            aria-describedby="edit-sale-storage"
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
                    <div className={classes.paper}>
                        <div className={classes.header}>
                            <h2>Editar venda</h2>
                         
                            <IconButton onClick={() => handleClose()} aria-label="close"  size="medium">
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                            
                        </div>
                        <div>
                            <StorageEditModal handleEdit={handleEdit} 
                            product={product} handleClose={handleClose} />
                        </div>
                        
                    </div>
                    
                 
            </Fade>
        </Modal>
    )
}


export default StorageModal
