import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/configStore'
import AppRouter from './router/AppRouter'
import { ThemeProvider } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import './styles/main.scss'
import 'react-sidebar-ui/dist/index.css';
import theme from './theme'



const jsx = (
    <Provider store={store}>
       <ThemeProvider theme={theme}>
            <AppRouter />
       </ThemeProvider>
       
    </Provider>
)
ReactDOM.render(jsx, document.getElementById("app"))