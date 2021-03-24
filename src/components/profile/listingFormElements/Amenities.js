import React, { useContext } from "react";
import { FormControlLabel, Checkbox, Typography } from"@material-ui/core";
import { ListingContext } from "../ListingFormWrapper";


function AmenitiesCheckbox(props) {

    return (
        <>
        <FormControlLabel
            style={{ marginTop: props.params ? -4 : -8, marginBottom: props.params ? -4 : -8 }}
            color="secondary"
            control={<Checkbox checked={props.checked} onChange={props.handleChange} color="primary" type="checkbox" name={props.name}/>}
            label={<Typography  variant="body2">{props.label}</Typography>}
        />
        <br/>
        </>
    );
}

function Amenities (props) {
    const listingContext = useContext(ListingContext);
    const params = props.searchParams;

    return (
        <>
        <AmenitiesCheckbox params={params} checked={params ? params.air_conditioning : listingContext.listing.air_conditioning} handleChange = {props.handleChange} name="air_conditioning" label="Air Conditioning"/>
        <AmenitiesCheckbox params={params} checked={params ? params.washing_machine : listingContext.listing.washing_machine} handleChange = {props.handleChange} name="washing_machine" label="Washing Machine"/>
        <AmenitiesCheckbox params={params} checked={params ? params.central_heating : listingContext.listing.central_heating} handleChange = {props.handleChange} name="central_heating" label="Central Heating"/>
        <AmenitiesCheckbox params={params} checked={params ? params.gas : listingContext.listing.gas} handleChange = {props.handleChange} name="gas" label="Gas"/>
        <AmenitiesCheckbox params={params} checked={params ? params.free_wifi : listingContext.listing.free_wifi} handleChange = {props.handleChange} name="free_wifi" label="Free WiFi"/>
        <AmenitiesCheckbox params={params} checked={params ? params.pwd_accessable: listingContext.listing.pwd_accessable} handleChange = {props.handleChange} name="pwd_accessable" label="Accessable for PWD"/>
        <AmenitiesCheckbox params={params} checked={params ? params.elevator : listingContext.listing.elevator} handleChange = {props.handleChange} name="elevator" label="Elevator"/>
        <AmenitiesCheckbox params={params} checked={params ? params.garage : listingContext.listing.garage} handleChange = {props.handleChange} name="garage" label="Garage"/>
        <AmenitiesCheckbox params={params} checked={params ? params.pool : listingContext.listing.pool} handleChange = {props.handleChange} name="pool" label="Pool"/>
        </>
    );
}

export default Amenities;
