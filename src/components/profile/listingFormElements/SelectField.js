import React from "react";
import { FormControl, InputLabel, Select, FormHelperText,  MenuItem } from "@material-ui/core";


function SelectField(props) {
  
  const options = () => { 
    return props.options.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>));
  };
    
  return (
    <FormControl 
      className={props.classes} error={props.error ? true: false} 
      required={props.required} 
      variant={(props.name === "year_built__gte" || props.name === "year_built__lte") ? "standard" : "outlined"}
    > 
      <InputLabel>{props.label}</InputLabel>
      <Select 
        id={props.id} 
        value={props.value} 
        onChange={props.handleChange} 
        name={props.name}  
        label={props.label}
        MenuProps={{ 
          getContentAnchorEl: () => null, 
          disableScrollLock: true, 
          PaperProps: {
            style: {
              position: "sticky", 
              maxWidth: 130, 
              maxHeight: (props.name === "number_of_rooms" || props.name === "year_built__gte"  || props.name === "year_built__lte") && 150,},},}}
      >
        {props.homePage && 
          <MenuItem value="">
            <em>Unselect</em>
          </MenuItem>
        }
        {options()}
      </Select>
      {props.error && <FormHelperText>Please select an option</FormHelperText>}
    </FormControl>
  );
}

export default SelectField;
