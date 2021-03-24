import React, { useEffect, useState, useRef, useContext } from "react";
import { makeStyles, Typography, Grid, Paper } from "@material-ui/core";
import axios from "axios";
import ListingsSideBar from "./ListingsSideBar";
import HomePageMap from "./map/HomePageMap";
import { CacheContext } from "./../layout/Dashboard";

const styles = makeStyles((theme) => ({
    root: {
      overflow: "auto",
      flexGrow: 1,
      paddingRight: 10,
    },
}));
  
let CACHE = {};

function HomePageBody(props) {
  const classes = styles();
  const cacheContext = useContext(CacheContext);
  
  const [data, setData] = useState([]);
  const [noListings, setNoListings] = useState(false);
  const [windowHeight, setwindowHeight] = useState(window.innerHeight);
  const params = useRef({});

  useEffect(() => {
    const resizeListener = () => {
      setwindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    }
  }, [])

  useEffect(() => {
    if (cacheContext.cacheReset) CACHE = {};
    if (props.params ) params.current = props.params;
    let queryString = "";
    for (const param in params.current ) {
      queryString = queryString + param + params.current[param];    
    }
    if (!queryString) queryString = "all";
    if (CACHE[queryString])  {
      setData(CACHE[queryString]);
      CACHE[queryString].length === 0 ? setNoListings(true) : setNoListings(false);
    } else {
      axios
      .get("/listings/", {
          params: params.current
        })
      .then(response => {
        CACHE[queryString] = response.data;
        setData(response.data);
        response.data.length === 0 ? setNoListings(true) : setNoListings(false);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
    }
  }, [props.params, cacheContext.cacheReset])
    
  return (
    <Grid container>
      <Grid id="map" item xs sm md lg>
          <HomePageMap data={data} /> 
      </Grid>
      <Grid id="listingsSideBar" item  xs={12} sm={6} md={5} lg={4} style={{ zIndex: 1 }}>
        <Paper 
          id="listingsSideBarPaper" 
          className={classes.root} 
          square elevation={4}
          style={{ 
            height: windowHeight -(48 + 10 + 10 + 30) 
          }}
        >
          {data && <ListingsSideBar data={data} />}
          {noListings && <Typography style={{ margin: 20 }}>No listings matching the query parameters.</Typography>}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default React.memo(HomePageBody);
