import React, { useState } from "react";
import { Popover, Chip, makeStyles, Typography, Divider, Grid, Button } from "@material-ui/core";
import ListingImageGallery from "../profile/myListingsElements/ListingImageGallery";

const styles = makeStyles((theme) => ({
  generalInfo: {
    width: "fit-content",
    color: theme.palette.text.primary,
    "& hr": {
      margin: theme.spacing(0.5, 1),
    },
  },
  chip: {
    margin: 2,
    borderRadius: 8,
  },
  button: {
    textTransform: "none",
    borderRadius: 0,
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 0,
    paddingBottom: 0,
    minWidth: 0,
    fontSize: 13,
  },
  popoverContent: {
    padding: 7,
  },
}));

function ListingBody(props) {
  const classes = styles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid item xs={12} sm={12} md={12} style={{ display: "flex", alignItems: "top", marginTop: 10 }}>
        <Typography variant="subtitle2" style={{ flex: 1 }}>
          {props.listing.street_building}, {props.listing.district}
        </Typography>
        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          {props.listing.currency === "USD" ? "$" : props.listing.currency === "RUB" ? "₽" : "֏"}
          {props.listing.price.toLocaleString()}
          {props.listing.transaction === "Rent" && `/ ${props.listing.rent_period === "Monthly" ? "Month" : "Day"}`}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems="center" className={classes.generalInfo}>
          <Typography variant="body2">Area: {props.listing.area}㎡</Typography>
          <Divider orientation="vertical" flexItem />
          {props.listing.home_type === "Apartment" && (
            <>
              <Typography variant="body2">Floor: {props.listing.floor}/{props.listing.number_of_floors}</Typography>
              <Divider orientation="vertical" flexItem />
            </>
          )}
          {props.listing.home_type !== "Apartment" && (
            <>
              <Typography variant="body2">Floors: {props.listing.number_of_floors}</Typography>
              <Divider orientation="vertical" flexItem />
            </>
          )}
          <Typography variant="body2">Furnishing: {props.listing.furnishing}</Typography>
          <Divider orientation="vertical" flexItem />
          {props.listing.home_type !== "Apartment" && (
            <>
              <Typography variant="body2">Lot size: {props.listing.lot_size}㎡</Typography>
              <Divider orientation="vertical" flexItem />
            </>
          )}
          <Typography variant="body2">Year built: {props.listing.year_built}</Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        {props.listing.air_conditioning && <Chip label="Air Conditioning" size="small" className={classes.chip}></Chip>}
        {props.listing.washing_machine && <Chip label="Washing Machine" size="small" className={classes.chip}></Chip>}
        {props.listing.central_heating && <Chip label="Central Heating" size="small" className={classes.chip}></Chip>}
        {props.listing.gas && <Chip label="Gas" size="small" className={classes.chip}></Chip>}
        {props.listing.free_wifi && <Chip label="Free Wifi" size="small" className={classes.chip}></Chip>}
        {props.listing.pwd_accessable && <Chip label="Accessable for PWD" size="small" className={classes.chip}></Chip>}
        {props.listing.elevator && <Chip label="Elevator" size="small" className={classes.chip}></Chip>}
        {props.listing.garage && <Chip label="Garage" size="small" className={classes.chip}></Chip>}
        {props.listing.pool && <Chip label="Pool" size="small" className={classes.chip}></Chip>}
      </Grid>

      {props.listing.images.length ? <ListingImageGallery images={props.listing.images} myListings={props.myListings} /> : null}

      {props.listing.description && (
        <>
          <Grid item xs={12} sm={12} md={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Divider style={{ marginTop: 3, marginBottom: 4 }}></Divider>
            <Typography variant="body2">{props.listing.description}</Typography>
          </Grid>
        </>
      )}

      <Grid item xs={12} sm={12} md={12} style={{ margin: 0, marginTop: 5, padding: 0 }}><Divider></Divider></Grid>

      <Grid item xs={12} sm={12} md={12} style={{ display: "flex", marginTop: 5, padding: 0 }}>
        <Typography color="textSecondary" style={{ flex: 1, fontSize: 13 }}>
          Created at: {props.listing.created.substring(0, 10)}
          {!props.myListings && (
            <>
              , By:
              <Button size="small" color="primary" className={classes.button} onClick={handleClick} >
                {props.listing.owner.username}
              </Button>
              <Popover
                classes={{ paper: classes.popoverContent }}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <Typography variant="caption" style={{ fontWeight: "bold" }}>
                  {props.listing.owner.first_name} {props.listing.owner.last_name}
                </Typography>
                <br />
                <Typography variant="caption">
                  Email: {props.listing.owner.email}
                </Typography>
                <br />
              </Popover>
            </>
          )}
        </Typography>
        {!props.homePage && (
          <Typography color="textSecondary" variant="caption">
            ID: {props.listing.id}
          </Typography>
        )}
      </Grid>
    </>
  );
}

export default ListingBody;
