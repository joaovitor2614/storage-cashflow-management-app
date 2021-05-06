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
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid gray'
    },
    
})
)

export const useStorageForm =  makeStyles(() => ({
    group: {
        display: 'flex',
        flexDirection: 'row',
        margin: '23px 0',
        padding: '4px',
        verticalAlign: 'middle',
        
        "& > *": {
            margin: '0 16px'
            }
     
    },
}))

