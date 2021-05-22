import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingPage from '../../LoadingPage'
import ProfileHistory from './history/ProfileHistory'
import ProfileTop from './ProfileTop'
import { getClientById } from '../../../actions/client'

const Profile = ({ match }) => {
    const dispatch = useDispatch();
    const clientState = useSelector(state => state.client);
    const { client, loading } = clientState
    console.log('client profile', client)
    console.log('client  state profile', clientState)
   useEffect(() => {
    const getData = () => {
        dispatch(getClientById(match.params.id));
    }
    getData();
    return () => getData;
}, [])
    return loading ? (<LoadingPage />) : (
        <div className='profile'>
            <ProfileTop client={client}  />
            <ProfileHistory client={client} loading={loading}
            
            />
        </div>
    )
}

export default Profile
