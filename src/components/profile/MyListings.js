import React, {useEffect, useState, useContext} from "react"
import { useMediaQuery, Box, IconButton, Tooltip, makeStyles, Typography, Divider, Grid, Paper } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ListingFormWrapper from "./ListingFormWrapper";
import ListingBody from "../base/ListingBody";
import { CacheContext } from "./../layout/Dashboard";

const styles = makeStyles((theme) => ({
  paper: {
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


function MyListings(props) {
  const classes = styles();
  const cacheContext = useContext(CacheContext);

  const matchesExtraSmall = useMediaQuery("(min-width: 0px)" && "(max-width: 600px)");
  const matchesSmall= useMediaQuery("(min-width: 601px)" && "(max-width: 750px)");
  const matchesMedium= useMediaQuery("(min-width: 751px)" && "(max-width: 1200px)");

  const [data, setData] = useState([]);
  const [noListings, setNoListings] = useState(false);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.get("/listings", {
        params: {"owner": user.id}
      })
    .then(response => {
      setData(response.data);
      response.data.length === 0 && setNoListings(true);
    })
    .catch(error => {
      console.log(error.response.data);
    });
  }, [])

  const handleDelete = (id, listingIndex) => {
    const token = localStorage.getItem("token");
    axios.delete(`/listings/${id}/`, {
      headers: {
        "Authorization": `Token ${token}`,
      }
    })
    .then(response => {
      if (response.status === 204) {
        let array = data;
        array.splice(listingIndex, 1);
        setData([...array]);
      } 
      cacheContext.setCacheReset(true);
    })   
    .catch(error => {
      console.log(error);
    })
  }
 
  const renderListings = (data) => {
    return data.map((listing, index) => {
      return (
        <Paper className={classes.paper} key={listing.id} elevation={2} >
          <Grid container spacing={1} className={classes.gridContainer}>
            <Grid item xs={12} sm={12} md={12} style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="overline" color="primary" style={{ flex: 1, fontWeight: "bold", fontSize: 11 }}>
                {listing.number_of_rooms}-room {listing.home_type} for {listing.transaction}
              </Typography>

              <ListingFormWrapper listing={listing} index={index} setData={setData}/>
              
              <Tooltip title="Delete" placement="top" PopperProps={{ popperOptions: {modifiers: {offset: {enabled: true, offset: "0px, -70px",},},} }}>
                <IconButton aria-label="delete" style={{ padding: 4 }} onClick={() => handleDelete(listing.id, index)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Grid>
            
            <Grid item xs={12} sm={12} md={12} style={{ margin: 0, padding: 0 }}><Divider ></Divider></Grid>
            
            <ListingBody listing={listing} myListings={true}/>
          </Grid>
        </Paper>
      );
    });
  };

  return (
    <Box pr={matchesExtraSmall ? 0 : matchesSmall ? 15 : matchesMedium ? 0 : 30}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }}>
        <Masonry>
          {data && renderListings(data)}
          {noListings && <Typography style={{ margin: 20 }}>You have not posted any listings yet.</Typography>}
        </Masonry>
      </ResponsiveMasonry>
    </Box>
  );
}

export default MyListings;
