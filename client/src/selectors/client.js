

  // função para filtrar items dinamicamente
  export default (clients, { byName,}) => {
      return clients.filter((client) => {
        const textMatch = client.name.toLowerCase().includes(byName.toLowerCase());
     
        
        return textMatch 
      })
  }
  
  