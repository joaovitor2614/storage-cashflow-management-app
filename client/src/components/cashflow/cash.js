import numeral from 'numeral'


export const getTotalBalance = (items) => {
    let totalBalance = 0;
    if (items.length > 0) {
        items.forEach((item) => {
            if (item.perKg) {
                totalBalance += item.kgs * item.perKg;
            } else if (item.perUnit) {
                totalBalance += item.units * item.perUnit;
            } 
        })
        return totalBalance;

    } else {
        return totalBalance;
    }
     
}

export const getExchange = (payment, balance) => {
      return balance - payment 
}


// pegar preço por quilo
export const getKgPrice = (item) => {
    let kgPrice = 0;
    const priceToNumber = parseFloat(item.pricePerUnit, 10);
    const weightToNumber = parseFloat(item.weight, 10);
    const profitToNumber = parseFloat(item.profitKg, 10);
    if (item.profitKg) {
       console.log('profitToNum', profitToNumber, 'priceTo', priceToNumber, 'weight', weightToNumber);
       kgPrice = ((profitToNumber / 100) * priceToNumber + priceToNumber) / weightToNumber
       console.log('kgPrice', kgPrice)
    }
    return kgPrice
}

// pegar preço por quilo
export const getUnitPrice = (item) => {
    let unitPrice = 0;
    const priceToNumber = parseFloat(item.pricePerUnit, 10);

    const profitToNumber = parseFloat(item.profitUnit, 10);
    if (item.profitUnit) {
       return unitPrice = ((profitToNumber / 100) * priceToNumber + priceToNumber)
    }
    return profitUnit;
}
