import React from 'react'
import {useTheme, useMediaQuery, makeStyles} from '@material-ui/core';
import { SelectFieldOptions } from '../../profile/listingFormElements/SelectFieldOptions'
import RadioField from '../searchBarElements/RadioField';
import SelectField from '../../profile/listingFormElements/SelectField'

const useStyles = makeStyles((theme) => ({
    formControlSelect: {
        width: '99.4%',  
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    }));
    
function Transaction(props) {
    const classes = useStyles()
    const theme = useTheme();
    const matchesExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));

    
    if (matchesExtraSmall) {
        return (
            <>
            <SelectField classes={classes.formControlSelect} value={props.transaction} handleChange = {props.handleChange} name="transaction" label="Transaction" options={SelectFieldOptions.transaction} homePage={true}/>
            {props.transaction === "Rent" &&
            <SelectField classes={classes.formControlSelect} value={props.rent_period} handleChange = {props.handleChange} name="rent_period" label="Rent Period" options={SelectFieldOptions.rent_period} homePage={true}/>
            }
            </>
            )
    } else {
        return (
            <>
            <RadioField label="Transaction" name="transaction" value={props.transaction} handleChange={props.handleChange} options={SelectFieldOptions.transaction}/>
            {props.transaction === "Rent" && 
            <RadioField label="Rent Period" name="rent_period" value={props.rent_period} handleChange={props.handleChange} options={SelectFieldOptions.rent_period}/>}
            </>
            )
    }
}

export default Transaction
