import React from "react";
import SelectField from "../../profile/listingFormElements/SelectField";
import { SelectFieldOptions } from "../../profile/listingFormElements/SelectFieldOptions";
import RadioField from "../searchBarElements/RadioField";
import { makeStyles, useTheme, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControlSelect: {
        width: "99.6%",  
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}));

function HomeTypeAndLocation(props) {
    const classes = useStyles();

    const theme = useTheme();
    const matchesExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));
    
    return (
        <> 
            {matchesExtraSmall 
            ?
                <SelectField 
                    classes={classes.formControlSelect} 
                    value={props.home_type} 
                    handleChange = {props.handleChange} 
                    name="home_type" 
                    label="Home Type" 
                    options={SelectFieldOptions.home_type} 
                    homePage={true}
                /> 
            : 
                <RadioField 
                    label="Home Type" 
                    name="home_type" 
                    value={props.home_type} 
                    handleChange={props.handleChange} 
                    options={SelectFieldOptions.home_type}
                /> 
            }  
            <SelectField 
                classes={classes.formControlSelect} 
                value={props.district} 
                handleChange = {props.handleChange} 
                name="district" 
                label="District" 
                options={SelectFieldOptions.district} 
                homePage={true}
            /> 
        </>
    );
}

export default HomeTypeAndLocation;
