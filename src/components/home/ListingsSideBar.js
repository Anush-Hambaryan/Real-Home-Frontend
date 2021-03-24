import React, { useEffect, useState, useRef } from "react";
import { makeStyles, Typography, Divider, Grid, Paper, useMediaQuery } from "@material-ui/core";
import ListingBody from "../base/ListingBody";


const styles = makeStyles((theme) => ({
  paper: {
    position: "sticky",
    margin: 10,
    padding: 15,
    paddingBottom: 3,
    paddingRight: 25,
    "&:hover": {
      boxShadow: "0 9px 12px 1px rgba(0,0,0,0.14), 0 3px 16px 2px rgba(0,0,0,0.12), 0 5px 6px -3px rgba(0,0,0,0.20)"
    },
  },
    gridContainer: {
      margin: 0,
      padding: 0,
    },
}))


function ListingsSideBar(props) {
  const classes = styles();
  const [page, setPage] = useState(0);
  const target = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage( prev => prev + 3)
        }
      },
      {
        root: document.getElementById("listingsSideBarPaper"),
        rootMargin: "20px",
        threshold: 0
      }
    );
    if (target.current) {
      observer.observe(target.current);
    }
  }, [target]);

  const handleListingHoverStart = (id) => {
    const marker = document.getElementById(id);
    if (marker) {
      marker.style.color = "#f50057";
      marker.parentElement.style.zIndex = 99999;
    }
  };

  const handleListingHoverEnd = (id) => {
    const marker = document.getElementById(id);
    if (marker) {
      marker.style.color = "black";
      marker.parentElement.style.zIndex = null;
    }
  };

  const matchesExtraSmall = useMediaQuery("(max-width: 600px)");

  const renderListings = (data) => {
    return data.map(listing => { 
      return (
        <Paper className={classes.paper} key={listing.id} elevation={2}  onMouseEnter={() => !matchesExtraSmall && handleListingHoverStart(listing.id)} onMouseLeave={()=> !matchesExtraSmall && handleListingHoverEnd(listing.id)}>
            <Grid container spacing={1} className={classes.gridContainer}>
              <Grid item xs={12} sm={12} md={12} style={{ display: "flex", alignItems: "top" }} >
                  <Typography  variant="body2" color="primary" style={{ flex: 1, fontWeight: "bold", fontSize: 11 }}>
                    {listing.number_of_rooms}-ROOM {listing.home_type.toUpperCase()} FOR {listing.transaction.toUpperCase()}
                  </Typography> 
                  <Typography color="textSecondary" variant="body2" style={{fontSize: 11}} >ID: {listing.id}</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} style={{margin: 0, padding: 0}}><Divider ></Divider></Grid>
              <ListingBody listing={listing} homePage={true}/>
            </Grid>
        </Paper>    
      );
  })}

  return (
    <>
      {renderListings(props.data.slice(0, page))}
      <div ref={target}></div>
    </>
  );
}

export default React.memo(ListingsSideBar);
