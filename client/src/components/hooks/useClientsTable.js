import { useState, useEffect } from 'react'
import selectClients from '../../selectors/client'
const createData = (name, cpf, phone, address, _id) => {
  
   return { name, cpf, phone, address, _id }
}

const useClientsTable = (clients, filters) => {
    const [rows, setRows] = useState([])
    useEffect(() => {
         const updateRows = (clients, setRows) => {
             const collection = [];
             const clientsDynamic = selectClients(clients, filters)
              clientsDynamic.forEach((client) => {
                  let data = createData(client.name, client.cpf, client.phone, client.address, client._id)
                   collection.unshift(data)
              })
              setRows([ ...collection])
         }
         updateRows(clients, setRows);
         return () => updateRows;
    }, [clients, filters])
   
    return { rows }
}

export default useClientsTable;