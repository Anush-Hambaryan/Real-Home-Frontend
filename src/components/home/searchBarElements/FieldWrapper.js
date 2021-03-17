import React from 'react';
import {Typography, useTheme, useMediaQuery, makeStyles, FormControl, FormLabel, FormGroup, Box} from '@material-ui/core';

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
    formLabelXs: {
        marginLeft: 10,
        marginTop: 10
    }
}));


function FieldWrapper(props) {
    const classes = useStyles()

    const theme = useTheme();
    const matchesExtraSmall = useMediaQuery(theme.breakpoints.down('xs'));

    if (matchesExtraSmall ) {
        return (
            <Box className={classes.formControl} style={{marginBottom: (props.label === "Year Built"|| props.label === "Area (㎡)") && matchesExtraSmall && theme.spacing(2)}}>
                <Typography color="textSecondary" className={classes.formLabelXs}>{props.label}</Typography> 
                    <FormGroup row={props.label !== "Amenities" && true} style={{paddingLeft : props.label === "Amenities" && 10}}>
                    {props.children}
                    </FormGroup>
            </Box>
        )
    } else {
        return ( 
            <FormControl component="fieldset" className={classes.formControl} >
                <FormLabel component="legend" className={classes.formLabel}>{props.label}</FormLabel> 
                    <FormGroup row={props.label !== "Amenities" && true} style={{paddingLeft : props.label === "Amenities" && 10}}>
                    {props.children}
                    </FormGroup>
            </FormControl>
        )
    }
}

export default FieldWrapper
