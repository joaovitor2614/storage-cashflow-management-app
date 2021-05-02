import React, { useState } from 'react'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import numeral from 'numeral'
import { numeralConfig } from './numeral';
import { getKgPrice, getUnitPrice } from './cash';
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
   
    input: {
        width: '2.5rem',
        height: '0.1rem'
      
    }
})
)



const CashFlowDisplay = ({ item, handleAdd }) => {
    const classes = useStyles();
    let [isKg, setIsKg] = useState(false);
    const toggleKg = () => setIsKg(!isKg);
    let [units, setUnits] = useState(item.profitKg !== '' ? 0 : 1);
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
  
        

                <div  className="cashflow-page__group-cart-form cashflow-page__group-list-item" 
                 key={item._id}>
                     <div className='cashflow-display__group__main'>
                                <div className='cashflow-display__group__main-1'>
                                    <small>{item.name}</small>
                                </div>
                                <div>
                                <div className='cashflow-display__group__main-2'>
                                        <small>{numeral(getKgPrice(item)).format('$0,0.00')}</small>
                                        <small style={{ opacity: isKg ? 1 : 0.6}}>Kg</small>
                                        <FormControlLabel
                                        control={<Switch checked={isKg} onChange={toggleKg} 
                                        name="toggle kg" />}
                                        />
                                        <small style={{ opacity: isKg ? 0.6 : 1}}>Unid.</small>
                                        
                                    </div>
                                    <small>{numeral(getUnitPrice(item)).format('$0,0.00')}</small>
                                </div>  
                                    
                               
                               
                    
                               
                       
                    </div>
                    <div className='cashflow-display__group'>
                        <div >
                            <small>Unidade em estoque: {item.storageAmount}</small>
                            
                        </div>
                        <div >
                            {isKg ? (
                                <div>
                                    <IconButton onClick={() => setKgs(++kgs)} size="small">
                                        <PlusOneIcon />
                                    </IconButton>
                                    <TextField variant="outlined" className={classes.input}
                                    type='number'  placeholder="Kg" 
                                    value={kgs} onChange={handleKgs} />
                                    <IconButton onClick={() => setKgs(--kgs)} size="small">
                                        <ExposureNeg1Icon />
                                    </IconButton>
                                </div>
                            
                            ) : (
                                <div>
                                    <IconButton onClick={() => setUnits(++units)} size="small">
                                        <PlusOneIcon />
                                    </IconButton>
                                    <TextField className={classes.input} variant="outlined"
                                    type='number' placeholder="Unidades" 
                                    value={units} onChange={handleUnits} />
                                    <IconButton onClick={() => setUnits(--units)} size="small">
                                        <ExposureNeg1Icon />
                                    </IconButton>
                                </div>
                            
                            )}
                            
                            <IconButton onClick={(e) => onSubmit(e, item, units, kgs, isKg, 
                            getKgPrice(item), getUnitPrice(item))} 
                            aria-label="add"  size="small">
                                    <AddShoppingCartIcon fontSize="inherit" />
                            </IconButton>
                        </div>

                    </div>
                  
                   
                    
                   

                </div>
      
    )
}

export default CashFlowDisplay
