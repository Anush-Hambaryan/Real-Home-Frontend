import React, { useState, useReducer } from "react";
import { Dialog, DialogActions, DialogContent, IconButton, Typography, Tooltip } from "@material-ui/core/";
import { Close, Edit } from "@material-ui/icons/";
import ListingForm from "./ListingForm";

export const ListingContext = React.createContext();

const initialState = {
  transaction: "",
  rent_period: "",
  currency: "",
  price: "",
  home_type: "",
  year_built: "",
  area: "",
  lot_size: "",
  floor: "",
  number_of_floors: "",
  number_of_rooms: "",
  furnishing: "",
  street_building: "",
  district: "",
  lat: "",
  lng: "",
  air_conditioning: false,
  washing_machine: false,
  central_heating: false,
  gas: false,
  free_wifi: false,
  pwd_accessable: false,
  elevator: false,
  garage: false,
  pool: false,
  description: "",
  to_delete: [],
  }

function reducer(listing, {property, value}) {
  if (property !== "to_delete") {
    return {
      ...listing,
      [property]: value
    }
  } else {
    return {
      ...listing,
      [property]: !value ? [] : listing.to_delete.concat(value)
    }
  }
}

function ListingFormWrapper(props) {
  const [listing, dispatch] = useReducer(reducer, initialState);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEdit = (listing_placeholder) => {
      for (const property in listing_placeholder) {
        if (listing_placeholder[property] === null) {
          dispatch({property: property, value: ""});
        } else {
          dispatch({property: property, value: listing_placeholder[property]});
        }
      } 
      setEditDialogOpen(true);
  };

  if (props.newListing) {
    return (
      <ListingContext.Provider value={{ listing, dispatch }}>
        <ListingForm  />
      </ListingContext.Provider>
    );
  } else {
    return (
      <ListingContext.Provider value={{ listing, dispatch }}>
        <Tooltip title="Edit" placement="top" PopperProps={{ popperOptions: {modifiers: {offset: {enabled: true, offset: "0px, -70px",},},}, }}>
          <IconButton aria-label="edit" style={{ padding: 4 }} onClick={()=> handleEdit(props.listing)}>
            <Edit />
          </IconButton>
        </Tooltip> 
        <Dialog 
          transitionDuration={5} 
          open={editDialogOpen} 
          onClose={()=> setEditDialogOpen(false)} 
          aria-labelledby="listing-edit-form" 
          fullScreen={false} 
          fullWidth={true} 
          maxWidth="xl"
        >
          <DialogActions style={{ backgroundColor: "#E8E8E8" }}>
            <Typography color="primary" variant="overline" style={{ marginLeft: 5, fontWeight: "bold" }} >Edit listing (ID: {props.listing.id})</Typography>
            <div style={{ flex: "1 0 0" }} />
            <IconButton onClick={()=> setEditDialogOpen(false)}>
                <Close color="primary" />
            </IconButton>
          </DialogActions>
          <DialogContent style={{ margin: 0, padding: 0 }}>
            <ListingForm  editDialogOpen={editDialogOpen} setEditDialogOpen={setEditDialogOpen} index={props.index} setData={props.setData}></ListingForm>
          </DialogContent>
        </Dialog>
      </ListingContext.Provider>
    );
  }
}

export default ListingFormWrapper;
