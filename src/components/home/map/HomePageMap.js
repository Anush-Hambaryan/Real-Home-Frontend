import React, {useState, useRef} from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Box, Popover, Typography, makeStyles, Card, CardActionArea, CardContent, CardMedia } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons/";
import ListingDialog from "./ListingDialog";


const useStyles = makeStyles((theme) => ({
    markerCard: { 
      minWidth: 140 
    },
    media: { 
      height: 100 
    },
    cardContent: {  
      padding: theme.spacing(1)
    },
    popover: { 
      pointerEvents: "none"
    },
    popoverContent: { 
      pointerEvents: "auto"
    },
    avatar: {
      position: "absolute", 
      backgroundColor: "white",
      color: "black",
      margin: 6,
      marginLeft: "45%",
      padding: 6,
      border: "solid 1px black"
    }
  }));


function MapLocation(props) {
  
    const classes = useStyles();
    const [openedPopover, setOpenedPopover] = useState(false);
    const [listingDialogOpen, setListingDialogOpen] = useState(false);
    const popoverAnchor = useRef(null);
  
    const popoverEnter = () => {
      setOpenedPopover(true);
    };
  
    const popoverLeave = () => {
      setOpenedPopover(false);
    };

  return (
    <>
      <Box style={{ transform: "translate(-60px, -100%)", zIndex: openedPopover && 999999, position: "relative" }}>
        {openedPopover && 
        <Popover
          className={classes.popover}
          classes={{ paper: classes.popoverContent }}
          open={openedPopover}
          anchorEl={popoverAnchor.current}
          anchorOrigin={{
            vertical: openedPopover && (document.getElementById(props.listing.id).getBoundingClientRect().y - (document.getElementById("dashboard").offsetHeight + document.getElementById("searchPanel").offsetHeight) < 200) ? "bottom" : "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: openedPopover && (document.getElementById(props.listing.id).getBoundingClientRect().y - (document.getElementById("dashboard").offsetHeight + document.getElementById("searchPanel").offsetHeight) < 200) ? "top" : "bottom",
            horizontal: "center",
          }}
          PaperProps={{ style: {position: "sticky", maxWidth: 150,}, onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
          disableScrollLock={true}
          elevation={4}
        >
          <Card className={classes.markerCard} onClick={() => setListingDialogOpen(true)}>
            <CardActionArea>
              {props.listing.images.length ?  
              <>
              <Paper className={classes.avatar} >
                <Typography style={{fontSize: 10, fontWeight: "bolder"}}> {props.listing.transaction === "Rent" ? "FOR RENT" : "FOR SALE"} </Typography>
              </Paper>
              <CardMedia className={classes.media} image={props.listing.images[0].image_medium} />  
              </> : 
              null}
              <CardContent className={classes.cardContent}>
                {!props.listing.images.length && 
                <Typography style={{fontSize: 10, fontWeight: "bolder"}}> {props.listing.transaction === "Rent" ? "FOR RENT" : "FOR SALE"} </Typography>}
                <Typography variant="caption" color="textSecondary">{props.listing.number_of_rooms}-room {props.listing.home_type} </Typography> <br/>
                <Typography variant="caption" color="textPrimary">{props.listing.currency==="USD" ? "$" : props.listing.currency==="RUB" ? "₽" : "֏"}{props.listing.price.toLocaleString()} {props.listing.transaction === "Rent" && `/ ${props.listing.rent_period === "Monthly" ? "Month" : "Day"}`}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Popover>}
            <LocationOn  onMouseEnter={popoverEnter}   onMouseLeave={popoverLeave} ref={popoverAnchor} id={props.listing.id} style={{ marginLeft: 50, color: openedPopover ? "#f50057" : "black"}}/>
      </Box>
      {listingDialogOpen && <ListingDialog open={listingDialogOpen} handleClose={setListingDialogOpen} listing={props.listing}/>}
    </>
  );
}


function HomePageMap(props) {

  const renderMarkers = (data) => {
    return data.map(
      listing => <MapLocation key={listing.id} listing = {listing} lat={listing.lat} lng={listing.lng}/>
    );
  };

  return (
    <>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: "API-KEY" }}
        defaultCenter={{lat: 40.1872,lng: 44.5152}}
        defaultZoom={12}
        hoverDistance={20}
        >
        {renderMarkers(props.data)}       
      </GoogleMapReact>
    </>
  );
}

export default React.memo(HomePageMap);
