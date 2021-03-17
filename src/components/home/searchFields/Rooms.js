import React from 'react'
import SelectField from '../../profile/listingFormElements/SelectField'
import { SelectFieldOptions } from '../../profile/listingFormElements/SelectFieldOptions'
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControlSelect: {
        width: '99.4%',  
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    }));

function Rooms(props) {
    const classes = useStyles()

    return (
        <SelectField classes={classes.formControlSelect} value={props.number_of_rooms} handleChange = {props.handleChange} name="number_of_rooms" label="Rooms" options={SelectFieldOptions.number_of_rooms} homePage={true}/>
    )
}

export default Rooms
