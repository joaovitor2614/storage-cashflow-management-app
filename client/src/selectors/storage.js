
// função para filtrar item por quantidade em estoque
const filterByQe = (item, byQe) => {
  switch (byQe) {
    case '0':
      return item
      break;
    case '1 a 5':
      if (item.storageAmount >= 1 && item.storageAmount <= 5) {
        console.log('item sotrage amount', item.storageAmount)
        return item
      }
      break
    case '6 a 15':
      if (item.storageAmount >= 6 && item.storageAmount <= 15) {
        return item
      }
      break
    case '16 a 50':
        if (item.storageAmount >= 16 && item.storageAmount <= 50) {
          return item
      
        }
        break
        case '51+':
          if (item.storageAmount >= 51) {
            return item;
           
          }
          break
      default:
        return;
  }
}

function filterByCategory(byCategory, item) {
  if (byCategory === 'All') {
    return item
  } else {
    if (byCategory.toLowerCase() == item.category.toLowerCase()) {
      return item
    }
  }
}

// função para filtrar items dinamicamente
export default (items, { byName, byCategory, byVu, byQe }) => {
    return items.filter((item) => {
      const textMatch = item.name.toLowerCase().includes(byName.toLowerCase());
      const categoryMatch = item.category.toLowerCase().includes(byCategory.toLowerCase());
      
      return textMatch && filterByCategory(byCategory, item) && filterByQe(item, byQe);
    })
}

