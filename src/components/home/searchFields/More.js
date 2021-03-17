import React from 'react'
import {TextField, makeStyles} from '@material-ui/core/'
import SelectField from '../../profile/listingFormElements/SelectField'
import { SelectFieldOptions } from '../../profile/listingFormElements/SelectFieldOptions'
import FieldWrapper from '../searchBarElements/FieldWrapper'

const useStyles = makeStyles((theme) => ({
    formControlMore: {
        width: '43%',  
        marginTop: 0,
        margin: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
            width: '40%',
          },
    },
    formControlFurnishing: {
        width: '99.4%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
    }));

function More(props) {
    const classes = useStyles()
    
    return (
        <> 
            <FieldWrapper label="Year Built">   
                <SelectField value={props.year_built__gte} handleChange = {props.handleChange} name="year_built__gte"  classes= {classes.formControlMore} label="Min" options={SelectFieldOptions.year_built} homePage={true}/>
                <SelectField value={props.year_built__lte} handleChange = {props.handleChange} name="year_built__lte"  classes= {classes.formControlMore} label="Max" options={SelectFieldOptions.year_built} homePage={true}/>
            </FieldWrapper>
            <FieldWrapper label="Area (㎡)">
                <TextField  value={props.area__gte} onChange = {props.handleChange} name="area__gte" className={classes.formControlMore} label="Min" variant="standard"/>
                <TextField  value={props.area__lte} onChange = {props.handleChange} name="area__lte" className={classes.formControlMore} label="Max" variant="standard"/>
            </FieldWrapper>
            <FieldWrapper label="Lot Size(㎡)">
                <TextField  value={props.lot_size__gte} onChange = {props.handleChange} name="lot_size__gte" className={classes.formControlMore} label="Min" variant="standard"/>
                <TextField  value={props.lot_size__lte} onChange = {props.handleChange} name="lot_size__lte" className={classes.formControlMore} label="Max" variant="standard"/>
            </FieldWrapper>
            <SelectField value={props.furnishing} handleChange = {props.handleChange} name="furnishing"  classes= {classes.formControlFurnishing} label="Furnishing" options={SelectFieldOptions.furnishing} homePage={true}/>   
        </>
    )
}

export default More
