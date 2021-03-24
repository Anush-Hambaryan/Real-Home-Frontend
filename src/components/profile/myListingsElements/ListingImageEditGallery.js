import React, { useState, useContext } from "react";
import { Box, Paper, IconButton } from "@material-ui/core/";
import { Close } from "@material-ui/icons/";
import { ListingContext } from "../ListingFormWrapper";


function ListingImageEditGallery(props) {
  const listingContext = useContext(ListingContext);
  const [stateChange, setStateChange] = useState(false);

  const deleteExistingImage = (image, e) => {
    listingContext.dispatch({property: "to_delete", value: image.id});
    e.currentTarget.parentNode.parentNode.remove();
  };

  const handleSelectedImageDelete = (image) => {
    const index = props.images.indexOf(image);
    props.setSelectedImages((prevImages) => {
      prevImages.splice(index, 1);
      return prevImages;
    });
    props.setPostImages((prevImages) => {
      prevImages.splice(index, 1);
      return prevImages;
    });
    setStateChange((prevState => !prevState)); 
  }

  return (
    <Paper variant="elevation" elevation={2}>
      <Box display="flex" flexWrap="nowrap" m={1} overflow="auto" maxWidth="100%">
      {props.editMode 
      ? listingContext.listing.images.map((image) => {
          return (
            <Box component="div" display="inline" position="relative" key={image.id}>
              <Box position="absolute" top="6%" right="4%" >
                <IconButton style={{ backgroundColor: "white", padding: 0 }}size="small" onClick={(e)=> deleteExistingImage(image, e)}><Close></Close></IconButton>
              </Box>
              <img alt="" src={image.image_medium} style={{ margin: "5px", width: "250px", height: "167px", border: "1px solid lightgrey", borderRadius: "7px" }}/>
            </Box>
          );
        }) 
      : props.images.map((image) => {
          return (
            <Box component="div" display="inline" position="relative" key={image}>
              <Box position="absolute" top="2%" right="2%" >
                <IconButton size="small" onClick={(e)=> handleSelectedImageDelete(image, e)}><Close></Close></IconButton>
              </Box>
              <img alt="" src={image} style={{ margin: "5px", width: "250px", height: "167px", border: "1px solid lightgrey", borderRadius: "7px" }}/>
            </Box>
          );
        })
      }
      </Box>
    </Paper>
  );
}

export default ListingImageEditGallery;
