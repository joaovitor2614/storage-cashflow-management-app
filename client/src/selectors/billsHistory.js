

  // função para filtrar items dinamicamente
  const selectBillsHistory = (bills, { byHistoryDescription }) => {
    return bills.filter((bill) => {
      console.log('bill', bill);
      console.log('byHistoryDescriptio', byHistoryDescription)
      const textMatch = bill.description.toLowerCase().includes(byHistoryDescription.toLowerCase());
   
      
      return textMatch 
    })
}

export default selectBillsHistory

