import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { a11yProps } from './Tab';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}))


const StorageHistoryPanel = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = newValue = setValue(newValue);

    return (
        <div className={root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simples tabs example">
                  
                    <Tab label="daily" {...a11yProps(0)} />
                    <Tab label="monthly" {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Movimentação Diária
            </TabPanel>
            <TabPanel value={value} index={1}>
                Movimentação Mensal
            </TabPanel>
        </div>
    )
}

export default StorageHistoryPanel