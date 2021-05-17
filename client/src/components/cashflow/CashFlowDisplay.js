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
        width: '42px',
  
      
    }
})
)



const CashFlowDisplay = ({ item, handleAdd }) => {
    const classes = useStyles();
    let [isKg, setIsKg] = useState(false);
    const toggleKg = () => setIsKg(!isKg);
    let [units, setUnits] = useState(0);
    let [kgs, setKgs] = useState(0);
    const handleUnits = (e, amount) => {

        
    if (e.target.value <= amount && e.target.value >= 0) {
        setUnits(e.target.value) 
    }
    }
    const handleKgs = (e, amount) => {
       let amountToNumber = parseFloat(amount, 10)
        
        if (e.target.value <= amountToNumber && e.target.value >= 0) {
        setKgs(e.target.value)
        }
    }
    const isDisabled = kgs !== 0 || units !== 0 ? false : true;
    const isDisabled2 = kgs === 0 || units === 0 ? false : true;
   
    const onSubmit = (e, item, units, kgs, isKg, perKg, perUnit) => {
        e.preventDefault()
         handleAdd(item, units, kgs, isKg, perKg, perUnit);
         setUnits(0);
         setKgs(0)
    } 
    return (
  
        

                <div className="cashflow-page__group-list__item" key={item._id}>
                     <div className="cashflow-page__group-list__item-info">
                                <div className="cashflow-page__group-list__item-info__name">
                                    <small>{item.name}</small>
                                </div>
                           
                                <div className="cashflow-page__group-list__toggle">
                                        <small>{numeral(getKgPrice(item)).format('$0,0.00')}</small>
                                        <small style={{ opacity: isKg ? 1 : 0.6}}>Kg</small>
                                        <FormControlLabel
                                        control={<Switch checked={isKg} onChange={toggleKg} 
                                        name="toggle kg" />}
                                        />
                                        <small style={{ opacity: isKg ? 0.6 : 1}}>Unid.</small>
                                        <small>{numeral(getUnitPrice(item)).format('$0,0.00')}</small>
                                        <IconButton disabled={isDisabled || isDisabled2} 
                                        onClick={(e) => onSubmit(e, item, units, kgs, isKg, 
                                            getKgPrice(item), getUnitPrice(item))} 
                                            aria-label="add"  size="small">
                                                    <AddShoppingCartIcon fontSize="inherit" />
                                        </IconButton>
                                        
                                </div>
                        
                    </div>
                    <div className="cashflow-page__group-list__item-actions">
                        <div className="cashflow-page__group-list__item-actions-info">
                            <small>Estoque: {item.storageAmount}</small>
                            {item.weight && <small>Quilo: {item.weight}</small>}
                        </div>
                        <div >
                            {isKg ? (
                                <div className="cashflow-page__group-list__item-amount">
                                    <IconButton 
                                    onClick={() => kgs < item.weight && setKgs(++kgs)} 
                                    size="small">
                                        <PlusOneIcon />
                                    </IconButton>
                                    <TextField className={classes.input} size="small"  
                                    variant="outlined" 
                                     placeholder="Kg"
                                    value={kgs} onChange={(e) => handleKgs(e, item.weight)} />
                                    <IconButton 
                                    onClick={() => kgs > 0 && setKgs(--kgs)} size="small">
                                        <ExposureNeg1Icon />
                                    </IconButton>
                                </div>
                            
                            ) : (
                                <div className="cashflow-page__group-list__item-amount">
                                    <IconButton 
                                    onClick={() => units < item.storageAmount 
                                    && setUnits(++units)} size="small">
                                        <PlusOneIcon />
                                    </IconButton>
                                    <TextField className={classes.input} size="small"  
                                    variant="outlined"
                                     placeholder="Unidades" 
                                    value={units} onChange={(e) => handleUnits(e, item.storageAmount)} />
                                    <IconButton 
                                    onClick={() => units > 0 && setUnits(--units)} size="small">
                                        <ExposureNeg1Icon />
                                    </IconButton>
                                </div>
                            
                            )}
                            
                           
                        </div>

                    </div>
                  
                   
                    
                   

                </div>
      
    )
}

export default CashFlowDisplay
