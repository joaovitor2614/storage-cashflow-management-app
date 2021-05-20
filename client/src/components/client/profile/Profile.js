import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingPage from '../../LoadingPage'
import ProfileHistory from './ProfileHistory'
import ProfileTop from './ProfileTop'
import { getClientById } from '../../../actions/client'

const Profile = ({ match }) => {
    const dispatch = useDispatch()
    const clientState = useSelector(state => state.client);
    const { client, loading, history } = clientState;
    useEffect(() => {
        const getData = () => {
            dispatch(getClientById(match.params.id));
        }
        getData();
        return () => getData;
    }, [])
    return loading ? <LoadingPage /> : (
        <div className='profile'>
            <ProfileTop client={client} />
            <ProfileHistory history={history} />
        </div>
    )
}

export default Profile
