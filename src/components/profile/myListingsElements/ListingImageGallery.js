import { Grid,  IconButton, Box, makeStyles } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import LazyLoad from "react-lazyload";

const styles = makeStyles((theme) => ({
    grid: {
        backgroundColor: "",
        "&:hover": {
            "& $box": {
                display: "inline",
        }
        }},
    box: {
        backgroundColor: "",
    },
    iconBtn: {
       backgroundColor: "white",
       "&:hover": {
        backgroundColor: "white",
    }
    }
}));

function ListingImageGallery(props) {
    const classes = styles();
    const [counter, setCounter] = useState(0);

    const handleClick = (name) => {
        name === "rightArrow" ?
        setCounter(prevCounter => prevCounter + 1) :
        setCounter(prevCounter => prevCounter - 1);
    }

    return (
        <Grid item xs={12} sm={12} md={12} lg={12} style={{ position: "sticky" }} className={classes.grid} align="center"> 
            <Box
                position="absolute"
                top="37%"
                left="4%"
                display="none"
                className={classes.box}
            >
                <IconButton size="small" className={classes.iconBtn} onClick={() => handleClick("leftArrow")} disabled={counter===0 && true} style={{ display: counter===0 && "none" }}>
                    <NavigateBefore style={{ color: "black", display: counter===0 && "none" }} fontSize="small"/>
                </IconButton>
            </Box>

            <Box
                position="absolute"
                top="37%"
                right="4%"
                display="none"
                className={classes.box}
            >
                <IconButton size="small" className={classes.iconBtn} onClick={() => handleClick("rightArrow")} disabled={counter===props.images.length-1 && true} style={{display: counter===props.images.length-1 && "none"}}> 
                    <NavigateNext style={{color: "black", display: counter===props.images.length-1 && "none"}} fontSize="small"/>
                </IconButton>
            </Box>
            {props.myListings 
            ?   <LazyLoad>
                <img src={props.images[counter].image_medium} alt="" width="100%" style={{ margin: -1, border: "1px solid grey", borderRadius: "10px" }}/>
                </LazyLoad> 
            : <img src={props.images[counter].image_medium} alt="" width="100%" style={{ margin: -1, border: "1px solid grey", borderRadius: "10px" }}/>}
            {[...Array(props.images.length)].map((e, i) => <FontAwesomeIcon key={i} icon={faCircle} size="xs" transform="shrink-4" color={counter===i ? "grey" : "lightgrey"}/>)}
        </Grid>
    );
}

export default ListingImageGallery;
