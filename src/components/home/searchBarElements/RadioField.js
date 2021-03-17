import React from 'react';
import { makeStyles, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: { 
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        padding: "0.5%", 
        border: "thin solid lightgrey", 
        borderRadius: 4,
        width: "98%",
    },
    formLabel: {
        paddingLeft: 4, 
        paddingRight: 4,
        marginLeft: 10,
    },
    formControlLabel: {
        marginTop: 0,
        marginLeft: 9,
        marginRight: 9,
        padding: 0,
    }
    }));


function RadioField(props) {
    const classes = useStyles()

    return (
        <FormControl component="fieldset" className={classes.formControl} >
            <FormLabel component="legend" className={classes.formLabel}>{props.label}</FormLabel>
            <RadioGroup row={props.name === "currency" ? true : false} variant="outlined" aria-label="transaction-type" name={props.name} type="radio" value={props.value} onClick={props.handleChange}>
                
                {props.options.map(option => (<FormControlLabel style={{margin: props.name !== "currency" ? -3 : 6}} labelPlacement={props.name === "currency" ? "bottom" : "end"} value={option} key={option} className={classes.formControlLabel} control={<Radio color="primary" size="small" />} label={option} />))}
           
            </RadioGroup>
        </FormControl>
    )
}

export default RadioField
