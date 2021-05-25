

  // função para filtrar items dinamicamente
 const selectBills = (bills, { byDescription, byPaid }) => {
    return bills.filter((bill) => {
      const textMatch = bill.description.toLowerCase().includes(byDescription.toLowerCase());
   
      
      return textMatch 
    })
}

export default selectBills;