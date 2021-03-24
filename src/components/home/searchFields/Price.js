import React from "react";
import { SelectFieldOptions } from "../../profile/listingFormElements/SelectFieldOptions";
import RadioField from "../searchBarElements/RadioField";
import { makeStyles, TextField, useTheme, useMediaQuery } from "@material-ui/core";
import FieldWrapper from "../searchBarElements/FieldWrapper";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import SelectField from "../../profile/listingFormElements/SelectField";

const useStyles = makeStyles((theme) => ({
    formControlPriceField: {
        margin: theme.spacing(1),
    },
    formControlSelect: {
      width: "99.4%",  
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
  },
}))


function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      allowNegative={false}
    />
  );
}
  
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function Price(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <>
      {matchesExtraSmall 
      ? 
        <SelectField 
          classes={classes.formControlSelect} 
          value={props.currency} 
          handleChange = {props.handleChange} 
          name="currency" 
          label="Currency" 
          options={SelectFieldOptions.currency} 
          homePage={true}
        /> 
      : 
        <RadioField 
          label="Currency" 
          name="currency" 
          value={props.currency} 
          handleChange={props.handleChange} 
          options={SelectFieldOptions.currency}
        />  
      }   
      <FieldWrapper label="Price">
        <TextField  
          InputProps={{ inputComponent: NumberFormatCustom }}
          value={props.price__gte} 
          onChange = {props.handleChange} 
          className={classes.formControlPriceField} 
          name="price__gte" 
          label="Min" 
          size="small" 
          variant="standard"
        />
        <TextField  
          InputProps={{ inputComponent: NumberFormatCustom }}
          value={props.price__lte} 
          onChange = {props.handleChange} 
          className={classes.formControlPriceField} 
          name="price__lte" 
          label="Max" 
          size="small" 
          variant="standard"
          />
      </FieldWrapper>
    </>
  );
}

export default Price;
