import React, {useState, useRef} from "react";
import { makeStyles, Popover, Box, Button, useMediaQuery } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: "none",
      },
    popoverContent: {
       pointerEvents: "auto",
       borderRadius: 0, 
      },
    button: {
        textTransform: "none",
        borderRadius: 0,
        margin: 5,
        padding: 2,
      }
}));

function SearchPopover(props) {
    const classes = useStyles();

    const [openedPopover, setOpenedPopover] = useState(false);
    const popoverAnchor = useRef(null);
  
    const popoverEnter = ({ currentTarget }) => {
      setOpenedPopover(true);
    };
  
    const popoverLeave = ({ currentTarget }) => {
      setOpenedPopover(false);
    };

    const matchesLarge = useMediaQuery("(min-width:1200px)");

    return (
        <>
            <Button
                style={props.name==="Home Type & Location" ?  {width: 215} : props.name==="Price" ? {width: 190} : props.name==="More" ? {width: 50} : {width: 105} }
                variant="outlined"
                className={classes.button} 
                color={ props.homeType || props.district || props.value || props.currency || (props.valueMin || props.valueMax || props.selectedAmenities) ? "secondary" : "primary"}
                ref={popoverAnchor}
                aria-owns={openedPopover ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={popoverEnter}
                onMouseLeave={popoverLeave} 
            >
                {
                props.value ? 
                    props.value : 
                props.currency && !props.valueMin && !props.valueMax?
                    props.currency === "AMD" ? "AMD" : props.currency === "USD" ? "USD": props.currency === "RUB" ? "RUB" : "" :
                props.valueMin || props.valueMax ? 
                    `${props.valueMin && (props.currency === "AMD" ? "֏" : props.currency === "USD" ? "$": props.currency === "RUB" ? "₽" : "")}
                    ${!props.valueMin ? "" :
                    props.valueMin.length === 9 ? `${parseInt(props.valueMin.substring(0,6)).toLocaleString()}k` : 
                    props.valueMin.length === 10 ? `${parseInt(props.valueMin.substring(0,7)).toLocaleString()}k` :
                    props.valueMin.length === 11 ? `${parseInt(props.valueMin.substring(0,8)).toLocaleString()}k` :
                    props.valueMin.length > 11 ? "100b(+)" :
                    parseInt(props.valueMin).toLocaleString()} 
                    ${(props.valueMin && props.valueMax) && " - "}
                    ${props.valueMax && (props.currency === "AMD" ? "֏" : props.currency === "USD" ? "$": props.currency === "RUB" ? "₽" : "")}
                    ${ !props.valueMax ? "" :
                    props.valueMax.length === 9 ? `${parseInt(props.valueMax.substring(0,6)).toLocaleString()}k` : 
                    props.valueMax.length === 10 ? `${parseInt(props.valueMax.substring(0,7)).toLocaleString()}k` :
                    props.valueMax.length === 11 ? `${parseInt(props.valueMax.substring(0,8)).toLocaleString()}k` :
                    props.valueMax.length > 11 ? "100b(+)" :
                    parseInt(props.valueMax).toLocaleString()}`.replace(/\s+/g, "") : 
                props.name === "Amenities" && props.selectedAmenities !== 0 ?
                    `${props.name}(+${props.selectedAmenities})` :
                props.homeType || props.district ?
                    `${props.homeType} ${props.district && `in ${props.district}`}`:
                props.name}
            </Button>
            <Popover
                className={classes.popover}
                classes={{
                    paper: classes.popoverContent,
                }}
                open={openedPopover}
                anchorEl={popoverAnchor.current}
                anchorOrigin={{
                    vertical: 40,
                    horizontal: props.name === "More" ? "right" : "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: props.name === "More" ? "right" : "left",
                }}
                PaperProps={{ 
                    style: {position: "sticky", 
                    width: props.name==="More" && matchesLarge ? 270 : 
                            props.name==="More" ? 530 : 
                            props.name==="Home Type & Location" || props.name==="Price"? 200 :
                            props.name==="Rooms" ? 120 : 
                            props.name==="Amenities" ? 210 :
                            160}, 
                    onMouseEnter: popoverEnter, onMouseLeave: popoverLeave 
                }}
                disableScrollLock={true} 
            >   
                <Box p={1} px={props.name !=="More" ? 1.7 : 0.7} style={{ display: props.name==="More" && "flex" }}>
                    {props.children}
                </Box> 
            </Popover>
        </>
    );
}

export default SearchPopover;
