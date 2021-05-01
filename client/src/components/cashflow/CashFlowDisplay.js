import React, { useState } from 'react'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import numeral from 'numeral'
import { numeralConfig } from './numeral';
import { getKgPrice, getUnitPrice } from './cash';



const CashFlowDisplay = ({ item, handleAdd }) => {
    const [isKg, setIsKg] = useState(false);
    const toggleKg = () => setIsKg(!isKg);
    const [units, setUnits] = useState(item.profitKg !== '' ? 0 : 1);
    const [kgs, setKgs] = useState(item.profitKg !== '' ? 1 : 0);
    const handleUnits = e => setUnits(e.target.value);
    const handleKgs = e => setKgs(e.target.value);
    const onSubmit = (e, item, units, kgs, isKg, perKg, perUnit) => {
        e.preventDefault()
         handleAdd(item, units, kgs, isKg, perKg, perUnit);
         setUnits(0);
         setKgs(0)
    } 
    return (
  
        

                <div className='cashflow-display' key={item._id}>
                     <div className='cashflow-display__group'>
                        <p>{item.name}</p>
            
                        <small>Preço por kg.: {numeral(getKgPrice(item)).format('$0,0.00')}</small>
                        <small>Preço por unid.: {numeral(getUnitPrice(item)).format('$0,0.00')}</small>
                        <FormControlLabel
                        control={<Switch checked={isKg} onChange={toggleKg} name="toggle kg" />}
                        label={isKg ? 'kg' : 'unid'} 
                        />
                     </div>
                  
                    <div className='cashflow-display__group'>
                        {item.weight && <small>{item.weight}</small>}
                        {item.profitKg && <small>Lucro(kg): {item.profitKg}%</small>}
                        <small>Unidade em estoque: {item.storageAmount}</small>
                        
                    </div>
                    <div className='cashflow-display__group'>
                        {isKg ? (
                            <input type='number' placeholder="Kg" 
                            value={kgs} onChange={handleKgs} />
                        ) : (
                            <input type='number' placeholder="Unidades" 
                            value={units} onChange={handleUnits} />
                        )}
                        
                        <IconButton onClick={(e) => onSubmit(e, item, units, kgs, isKg, 
                        getKgPrice(item), getUnitPrice(item))} 
                        aria-label="add"  size="small">
                                <AddShoppingCartIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                    
                   

                </div>
      
    )
}

export default CashFlowDisplay
