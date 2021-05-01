import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getItems } from '../../actions/storage';
import LoadingPage from '../LoadingPage';
import StorageActions from './StorageActions';

import StorageTable from './StorageTable';

const Storage = () => {
  const dispatch = useDispatch();
  const storage = useSelector(state => state.storage);
  const filters = useSelector(state => state.storageFilter)
  const { loading, items } = storage;
  useEffect(() => {
     dispatch(getItems())
     
  }, [])
  // checkar pra ver se o storage ainda ta carregando
  return loading ? <LoadingPage /> : (
    <div className='storage-page'>
      <StorageActions filters={filters} />
      <StorageTable items={items} filters={filters} />
    </div>
    
  )
}

export default Storage


