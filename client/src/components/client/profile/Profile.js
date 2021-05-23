import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingPage from '../../LoadingPage'
import ProfileHistory from './history/ProfileHistory'
import ProfileTop from './ProfileTop'
import { getClientById } from '../../../actions/client'

const Profile = ({ match }) => {
    const dispatch = useDispatch();
    const historyState = useSelector(state => state.history);
    const { history, loading } = historyState
  
   useEffect(() => {
    const getData = () => {
        dispatch(getClientById(match.params.id));
    }
    getData();
    return () => getData;
}, [])
    return loading ? (<LoadingPage />) : (
        <div className='profile'>
            <ProfileTop client={history}  />
            <ProfileHistory client={history} loading={loading}
            
            />
        </div>
    )
}

export default Profile
