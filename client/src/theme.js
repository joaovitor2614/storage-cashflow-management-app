import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// sobrepor cor do input 
const theme = createMuiTheme({
    overrides: {
            MuiFilledInput: {
              root: {
                "&:hover": {
                  backgroundColor: '#7d0dee',
               }
              }
            },
           
}})

export default theme