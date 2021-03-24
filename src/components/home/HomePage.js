import React, { useReducer, useState } from "react";
import { Typography, useTheme, Box, DialogContent, Dialog, DialogActions, IconButton, useMediaQuery, Paper, makeStyles, Button } from "@material-ui/core";
import { SelectFieldOptions } from "../profile/listingFormElements/SelectFieldOptions";
import { Close } from "@material-ui/icons/";
import SelectField from "../profile/listingFormElements/SelectField";
import Amenities from "../profile/listingFormElements/Amenities";
import SearchPopover from "./searchBarElements/SearchPopover";
import HomePageBody from "./HomePageBody";
import Transaction from "./searchFields/Transaction";
import Price from "./searchFields/Price";
import HomeTypeAndLocation from "./searchFields/HomeTypeAndLocation";
import Rooms from "./searchFields/Rooms";
import More from "./searchFields/More";
import RadioField from "./searchBarElements/RadioField";
import FieldWrapper from "./searchBarElements/FieldWrapper";


const initialState = {
    transaction: "",
    rent_period: "",
    currency: "",
    price__gte: "",
    price__lte: "",

    district: "",
    home_type: "",
    year_built__gte: "",
    year_built__lte: "",
    area__gte: "",
    area__lte: "",
    lot_size__gte: "",
    lot_size__lte: "",
    number_of_rooms: "",
    furnishing: "",
    
    air_conditioning: "",
    washing_machine: "",
    central_heating: "",
    gas: "",
    free_wifi: "",
    pwd_accessable: "",
    elevator: "",
    garage: "",
    pool: "",
};
  
function reducer(listing, {property, value}) {
    return {
        ...listing,
        [property]: value
    };
};


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",  
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    button: {
        textTransform: "none",
        borderRadius: 0,
        margin: 5,
        padding: 2,
      }
}));


function HomePage(props) {
    const classes = useStyles();
    const [params, dispatchParams] = useReducer(reducer, initialState);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [search, setSearch] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState(0);

    const handleChange = (e) => {
        setSearch(false);
        const name = e.target.name;
        const value = e.target.type === "checkbox" && e.target.checked ? true : 
                    e.target.type === "checkbox" && !e.target.checked ? "" :
                      name === "area__gte" ||  name === "area__lte" || name === "lot_size__gte" || name === "lot_size__lte" ?  
                      e.target.value.replace(/[^0-9]/g, "") :
                      e.target.type === "radio" && params[name] === e.target.value ? "" :
                      e.target.value;
        dispatchParams({
            property: name, 
            value:  value
        });
        if (e.target.type === "checkbox") {
            value === true 
            ? setSelectedAmenities(prevState => prevState + 1) 
            : setSelectedAmenities(prevState => prevState - 1);
        }
    };

    const resetFilters = () => {
        setSearch(false);
        for (const property in initialState) {
            dispatchParams({ property: property, value: initialState[property] });
        }
        setSelectedAmenities(0);
        setSearch(true);
    };
    
    const theme = useTheme();
    const matchesExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));
    const matchesSmall = useMediaQuery("(min-width:600px)");
    const matchesMedium = useMediaQuery("(min-width:900px)");
    const matchesLarge = useMediaQuery("(min-width:1200px)");

    return (
        <>  
        <Paper id="searchPanel" square elevation={4} style={{marginTop: 10, paddingLeft: 10, position: "relative", zIndex: 2 }}>
            
            {matchesSmall && 
                <>
                <SearchPopover name="Transaction" value={params.transaction === "Sale" ? params.transaction : params.transaction ? `${params.rent_period} ${params.transaction}` : ""}>
                    <Transaction transaction={params.transaction} rent_period={params.rent_period} handleChange={handleChange}/>
                </SearchPopover>
                <SearchPopover name="Price" valueMin={params.price__gte} valueMax={params.price__lte} currency={params.currency}>
                    <Price price__gte={params.price__gte} price__lte={params.price__lte} currency={params.currency} handleChange={handleChange}/>
                </SearchPopover>
                </>
            }

            {matchesMedium && 
                <SearchPopover name="Home Type & Location" homeType={params.home_type} district={params.district}>
                    <HomeTypeAndLocation home_type={params.home_type} district={params.district} handleChange={handleChange}/>
                </SearchPopover>
            }

            {matchesLarge && 
                <>
                <SearchPopover name="Rooms" value={params.number_of_rooms && `${params.number_of_rooms}-room`}>
                    <Rooms number_of_rooms={params.number_of_rooms} handleChange={handleChange}/>
                </SearchPopover>
                <SearchPopover name="Amenities" selectedAmenities={selectedAmenities}>
                    <Amenities handleChange={handleChange} searchParams={params}/>
                </SearchPopover>
                </>
            }
            
            {(matchesSmall || matchesMedium || matchesLarge) &&
                <> 
                <SearchPopover name="More">
                    {!matchesLarge && 
                    <Box m={1} style={{ width: "42%" }}> 
                        { !matchesLarge &&
                        <>
                            { !matchesMedium &&
                                <SelectField value={params.district} handleChange = {handleChange} name="district"  classes= {classes.formControl} label="District" options={SelectFieldOptions.district}/> 
                            }
                            <FieldWrapper label="Amenities">
                                <Box pl={1}><Amenities handleChange={handleChange} searchParams={params}/></Box>
                            </FieldWrapper>
                        </> }
                    </Box>
                    }

                    <Box mx={1} style={{ width: matchesLarge ? "100%" : "58%" }}> 
                        { !matchesMedium &&
                            <RadioField label="Home Type" name="home_type" value={params.home_type} handleChange={handleChange} options={SelectFieldOptions.home_type}/>  
                        }
                        { !matchesLarge &&
                            <Box mt={matchesMedium && 2 }><SelectField value={params.number_of_rooms} handleChange = {handleChange} name="number_of_rooms"  classes= {classes.formControl} label="Rooms" options={SelectFieldOptions.number_of_rooms} homePage={true}/></Box>
                        }
                        <More handleChange={handleChange} year_built__gte={params.year_built__gte} year_built__lte={params.year_built__lte}
                            area__gte={params.area__gte} area__lte={params.area__lte}
                            lot_size__gte={params.lot_size__gte} lot_size__lte={params.lot_size__lte} furnishing={params.furnishing}
                        /> 
                    </Box>
                </SearchPopover>
                <Button className={classes.button} variant="contained" color="primary" onClick={() => setSearch(true)}>Search</Button>
                <Button className={classes.button} style={{paddingLeft: 7, paddingRight: 7}} variant="contained" color="primary" onClick={resetFilters}>Reset Filters</Button>
                </>
            }
        
            {matchesExtraSmall && 
                <>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => setDialogOpen(true)}>Filters</Button>
                    <div style={{ flexGrow: 1 }}></div>
                    {props.user && <Typography style={{ marginRight: 12 }} variant="body2" component="span">Hi, {props.user}</Typography>}
                </div>
                <Dialog PaperProps={{ style: {position: "sticky"} }}transitionDuration={5} open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="listing-edit-form" fullScreen={false} fullScreen>
                    <DialogActions style={{backgroundColor: "#E8E8E8"}}>
                        <Button className={classes.button} variant="contained" color="primary" onClick={() => {setSearch(true); setDialogOpen(false)}}>Search</Button>
                        <Button className={classes.button} style={{ marginLeft: 10, paddingLeft: 7, paddingRight: 7 }} variant="contained" color="primary" onClick={resetFilters}>Reset Filters</Button>
                        <div style={{ flex: "1 0 0" }} />
                        <IconButton onClick={()=> setDialogOpen(false)}>
                            <Close color="primary" />
                        </IconButton>
                    </DialogActions>
                    <DialogContent style={{ margin: 0, padding: 20, paddingBottom: 40 }}>
                        <Transaction transaction={params.transaction} rent_period={params.rent_period} handleChange={handleChange}/>
                        <Price price__gte={params.price__gte} price__lte={params.price__lte} currency={params.currency} handleChange={handleChange}/>
                        <HomeTypeAndLocation home_type={params.home_type} district={params.district} handleChange={handleChange}/>
                        <Rooms number_of_rooms={params.number_of_rooms} handleChange={handleChange}/>
                        <More handleChange={handleChange} year_built__gte={params.year_built__gte} year_built__lte={params.year_built__lte}
                        area__gte={params.area__gte} area__lte={params.area__lte}
                        lot_size__gte={params.lot_size__gte} lot_size__lte={params.lot_size__lte} furnishing={params.furnishing}
                        />
                        <FieldWrapper label="Amenities">
                            <Amenities handleChange={handleChange} searchParams={params} />
                        </FieldWrapper>
                    </DialogContent>
                </Dialog>
                </>
            }
        </Paper> 
    
        <HomePageBody params={ search ? params : undefined } />
        </>
    );
}


export default React.memo(HomePage);

