import { makeStyles } from '@material-ui/core/styles'

export const useStorageTable = makeStyles(() => ({
    
    storageTable: {
        width: '1400px',
        maxWidth: '1500px',
        maxHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '100px',
        marginLeft: '25px'
    },
    paper: {
        width: '1200px'
    },
    header: {
        backgroundColor: '#9C48F0',
        color: 'white'
    }
})
)

export const useStorageModal = makeStyles((theme) => ({
   
    modal: {
        display: 'flex',
        justifyContent: 'center',
        margin: '15px 0',
       
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        heigh: '100%',
        padding: theme.spacing(2, 4, 3)
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid gray'
    },
    input: {
        input: '28rem'
    }
    
})
)

export const useStorageForm =  makeStyles(() => ({
    group: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        margin: '13px 0',
        padding: '2px',
        verticalAlign: 'middle',
        
        "& > *": {
            margin: '0 7px'
            }
     
        },
        actions: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            margin: '3px 0',
            verticalAlign: 'middle',
            
            "& > *": {
                margin: '0 32px'
                }
         
            },
        prices: {
            display: 'flex',
            flexDirection: 'row',
            "& > *": {
                margin: '0 11px'
                }
         
        }
    })
)

