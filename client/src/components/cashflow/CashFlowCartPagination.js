import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import numeral from 'numeral'
import { numeralConfig } from './numeral';
import ReactPaginate from 'react-paginate'

const CashFlowCartPagination = ({ items, handleAdd = '', handleRemove = '' }) => {
    console.log('items', items)
    
    const [pageNumber, setPageNumber] = useState(0);
 

    const dataPerPage = 4;
    const itemsVisited = pageNumber * dataPerPage;
    const displayPages = items
    .slice(itemsVisited, itemsVisited + dataPerPage)
    .map((dt) => {
        return (
        <div className="cashflow-page__group-cart__list-item" key={dt._id}>
            <div className="cashflow-page__group-cart__list-item__header">
                <h5>{dt.name}</h5>
                <IconButton onClick={() => handleRemove(dt._id)} 
                aria-label="remove"  size="small">
                        <RemoveShoppingCartIcon fontSize="inherit" />
                </IconButton>
            </div>
            <div className="cashflow-page__group-cart__list-item__amount">

                {dt.units && <small>Unidades: {dt.units}</small>}
                {dt.kgs && <small>Kg: {dt.kgs}</small>}
            </div>
             
           
             
        </div>
        )
    })
    // arredondar numero de pagina
    const pageCount = Math.ceil(items.length / dataPerPage)
    // mudar pagina
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return (
        <div>
             <div className="cashflow-page__group-cart__list">
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
           
        </div>
    )
      
}

export default CashFlowCartPagination
