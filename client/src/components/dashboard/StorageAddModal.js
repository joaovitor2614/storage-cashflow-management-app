import React from 'react';
import { useDispatch } from 'react-redux'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import { useStorageModal } from '../../styles/components/storage/useStorage';
import StorageAddForm from './StorageAddForm';
import { addItem } from '../../actions/storage'

const StorageAddModal = ({ open, handleClose, handleSubmit, data = '', handleRemove = '' }) => {
    
    const classes = useStorageModal();
    


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
                    <div className={classes.paper}>
                        <div className={classes.header}>
                            <h2>Atualizar estoque</h2>
                         
                            <IconButton onClick={() => handleClose()} aria-label="close"  size="medium">
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                            
                        </div>
                        <small>* = Campos obrigatórios / Caso ração, especifique peso e porcentagem de lucro por kg</small>
                        <div>
                            <StorageAddForm data={data} handleSubmit={handleSubmit} 
                            handleClose={handleClose} 
                            handleRemove={handleRemove}
                            />
                            
                            
                        </div>
                    </div>
                 
                </Fade>

            </Modal>
      
    )
}

export default StorageAddModal