

  // função para filtrar items dinamicamente
  export default (bills, { byDescription }) => {
    return bills.filter((bill) => {
      const textMatch = bill.description.toLowerCase().includes(byDescription.toLowerCase());
   
      
      return textMatch 
    })
}

