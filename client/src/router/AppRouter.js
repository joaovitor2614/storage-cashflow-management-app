import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import CashFlow from '../components/cashflow/CashFlow';
import Storage from '../components/dashboard/Storage'

import { ToastContainer } from 'react-toastify'
import StorageHistory from '../components/history/StorageHistory';
import Login from '../components/auth/Login';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/auth';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SideBar from '../components/layout/SideBar';
import Client from '../components/client/Client';
import AddClient from '../components/client/AddClient';

import EditClient from '../components/client/EditClient';
import Profile from '../components/client/profile/Profile';
import Bills from '../components/bills/Bills';
import AddBill from '../components/bills/AddBill';
import EditBill from '../components/bills/EditBill';






const AppRouter = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


   const dispatch = useDispatch()
    useEffect(() => {
      

        // checkar token no LS
        if (localStorage.token) {
          setAuthToken(localStorage.token);
        }
        dispatch(loadUser());
    
        // deslogar user de tds as tabs se ele se deslogar de uma
        window.addEventListener('storage', () => {
          if (!localStorage.token) dispatch({ type: LOGOUT });
        });
      }, []);
    return(
    <Router >
        
        <Fragment>
        <ToastContainer
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
        {isAuthenticated && <SideBar />}
       
           
            
  
                <Switch>
                    <PublicRoute exact path='/' component={Login} />
                    <PrivateRoute exact path="/storage" component={Storage} />
                    <PrivateRoute exact path="/cashflow" component={CashFlow} />
                    <PrivateRoute exact path="/client" component={Client} />
                    <PrivateRoute exact path="/update-client/:id" component={EditClient} />
                    <PrivateRoute exact path="/add-client"  component={AddClient} />
                    <PrivateRoute exact path="/storage-history" component={StorageHistory} />
                    <PrivateRoute exact path="/history/:id" component={Profile} />
                    <PrivateRoute exact path="/bills" component={Bills} />
                    <PrivateRoute exact path="/add-bill" component={AddBill} />
                    <PrivateRoute exact path="/edit-bill/:id" component={EditBill} />
                </Switch >
       

        </Fragment>


    </Router>
)
    };

export default AppRouter;
