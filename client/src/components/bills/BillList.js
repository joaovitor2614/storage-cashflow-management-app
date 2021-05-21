import React, { useState} from 'react'
import { useDispatch } from 'react-redux'
import BillItem from './BillItem'
import ReactPaginate from 'react-paginate'
import { removeBill } from '../../actions/bills';
const BillList = ({ bills }) => {
    const dispatch = useDispatch();
    const handleRemove = (id) => {
        dispatch(removeBill(id))
    }
    // logica paginação
    const [pageNumber, setPageNumber] = useState(0);
    const dataPerPage = 4;
    const itemsVisited = pageNumber * dataPerPage;
    const displayPages = bills.length > 0
    && bills.slice(itemsVisited, itemsVisited + dataPerPage)
    .map((bill) => {
        return (
        <div className='bills__list' key={bill._id}>
            <BillItem handleRemove={handleRemove} bill={bill} />
        </div>
        )
    })
    const pageCount = Math.ceil(bills.length / dataPerPage)
    // mudar pagina
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return (
        <div>
           
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

export default BillList
