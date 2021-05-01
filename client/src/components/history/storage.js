// funçãos para manipular dados

// pegar o balanço total de vendas
export const getSalesBalance = (sales) => {
    let balance = 0;
    sales.forEach((sale) => {
        const saleBalanceToNumber = parseFloat(sale.balance, 10);
        balance += saleBalanceToNumber;
    })
    return balance
}