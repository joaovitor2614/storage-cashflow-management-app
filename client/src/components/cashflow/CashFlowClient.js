import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'

const CashFlowClient = ({ clients, handleClient }) => {
    const [pageNumber, setPageNumber] = useState(0);

    const dataPerPage = 6;
    const itemsVisited = pageNumber * dataPerPage;
    const displayPages = clients.length > 0
    ? clients.slice(itemsVisited, itemsVisited + dataPerPage)
    .map((client) => {
        return (
        <div key={client._id} className="cashflow-page__client" onClick={() => handleClient(client)}>
             <h5>{client.name}</h5>
          </div>
        )
    }) : (<h5>Sem clientes encontrados para esse nome</h5>)
    const pageCount = Math.ceil(clients.length / dataPerPage)
    // mudar pagina
    const changePage = ({ selected }) =>   setPageNumber(selected);
      
    
    return (
       <div className="cashflow-page__client-list">
          {displayPages}
          <ReactPaginate 
              previousLabel={"Anterior"}
              nextLabel={"Próximo"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBtns"}
              previousLinkClassName={"previousBtn"}
              nextLinkClassName={"nextBtn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
        />
       </div>
    )
}

export default CashFlowClient
