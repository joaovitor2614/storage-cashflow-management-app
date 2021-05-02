import React, { useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        
        padding: '15px',
        width: '35rem',
        height: '48rem',
 
    }
}))

export const TabContent = (props) => {
    const classes = useStyles()
    const { children, value, index, ...other } = props
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}
        className={classes.root} >
            {value === index && (
                <div>
                   { children }
                </div>
            )}
        </div>
    )
}

export function a11yProps(index) {
  return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
  }
}

