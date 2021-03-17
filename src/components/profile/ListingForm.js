import React, {useState, useContext} from 'react';
import { useMediaQuery, useTheme, Grid, Paper, Button,  FormControl,  makeStyles, TextField, FormLabel, Divider, Typography} from '@material-ui/core';
import Geocode from "react-geocode";
import ImageUpload from './listingFormElements/ImageUpload';
import Amenities from './listingFormElements/Amenities';
import SelectField from './listingFormElements/SelectField';
import {ListingContext} from './ListingFormWrapper';
import {CacheContext} from './../layout/Dashboard'
import axios from 'axios';
import ListingImageEditGallery from './myListingsElements/ListingImageEditGallery';
import {SelectFieldOptions} from './listingFormElements/SelectFieldOptions'
import Message from './listingFormElements/Message';
const Compress = require('compress.js')


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10, 
        padding: 30,
        [theme.breakpoints.down('xs')]: {
            padding: 20, 
          },
    },
    marginControl: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
    formControl: {
        minWidth: 240,  
        [theme.breakpoints.between('sm', 'sm')]: {
            minWidth: 200,
          },
        [theme.breakpoints.down('xs')]: {
            minWidth: 200,
          },
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    }));


function ListingForm(props) {
    const classes = useStyles();
    const listingContext = useContext(ListingContext)
    const cacheContext = useContext(CacheContext)

    const [selectedImages, setSelectedImages] = useState([]);
    const [postImages, setPostImages] = useState([]);
    const [errors, setErrors] = useState({})
    const [postedSuccessfully, setPostedSuccessfully] = useState(false)
    const [submitting, setSubmitting] = useState(false)
   

    const handleChange = (e) => {
        
        if(e.target.files) {
            errors.images && setErrors({...errors, images: ""})
            const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            setSelectedImages([...selectedImages, ...fileArray]);
            setPostImages((prevImages) => prevImages.concat(Array.from(e.target.files)))
        } else if (e.target.type !== 'file') {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        listingContext.dispatch({property: e.target.name, value: value});
        setErrors({...errors, [e.target.name]: ""});
    }
    };


    Geocode.setApiKey("AIzaSyDrQozQbHcgDzFM0mGzCEmhFDCaBiqn1XU");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true)
        
        let formdata = new FormData()
        for (const property in listingContext.listing) {
            formdata.append(property, listingContext.listing[property])
        }
        
        const address = `${listingContext.listing.street_building}, ${listingContext.listing.district}, Yerevan, Armenia`;
        await Geocode.fromAddress(address).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              formdata.append("lat", lat.toFixed(6));
              formdata.append("lng", lng.toFixed(6));
            },
            (error) => {
              console.error(error);
            }
          );

        const compress = new Compress()
        
        await compress.compress(postImages, {
            size: 0.5, 
            quality: .8, 
            maxWidth: 2300,
            maxHeight: 1470, 
            resize: true,
            }).then((resizedImages) => {
                console.log(resizedImages)
                resizedImages.forEach((image, index) => {
                    const base64str = image.data
                    const imgExt = image.ext
                    const file = Compress.convertBase64ToFile(base64str, imgExt)
                    formdata.append(`image${index}`, file)
                }) 
            })

        const token = localStorage.getItem('token')
        props.editDialogOpen ? axios.put(`/listings/${listingContext.listing.id}/`, formdata, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            listingContext.dispatch({property: 'to_delete', value: ""});
            setPostImages([]);
            if (response.statusText === "OK") {
                props.setData(prev => {
                    return prev.map((listing, index) => {
                        if (index === props.index ) {
                            return response.data 
                        } else {
                            return listing
                        }
                    })
                })
            }
            cacheContext.setCacheReset(true);
            props.setEditDialogOpen(false)
            })
        .catch(error => {
            setErrors(error.response.data);
            setSubmitting(false)
        }) :
          axios.post('/listings/', formdata, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          })
        .then(response => {
            if (response.status === 201) {
                for (const property in listingContext.listing) {
                    listingContext.dispatch({
                        property: property, 
                        value: typeof(listingContext.listing[property]) === "boolean" ? false :
                                property === "to_delete" ? [] : ''
                    });
                }
                setSelectedImages([]);
                setSubmitting(false)
                setPostedSuccessfully(true);
                cacheContext.setCacheReset(true); 
            }
        })
        .catch(error => {
          setErrors(error.response.data);
          setSubmitting(false)
        })
    }

    const theme = useTheme();
    const matchesLg = useMediaQuery(theme.breakpoints.up('lg'));
    const matchesSm = useMediaQuery(theme.breakpoints.between('sm', 'sm'));

    return (
        <Paper className={classes.root} elevation={4}>
            {!props.editDialogOpen ? <Typography component="div" variant="overline">Please fill out the form below to add a listing.</Typography>: null}
            <Typography variant="caption" color="secondary">All fields marked with * are required </Typography>
            <Divider style={{marginTop: 10, marginBottom: 10}}></Divider>
            <Grid container spacing={1}>  
                {props.editDialogOpen && <Grid item xs={12} sm={12} md={12} lg={12} >
                    <ListingImageEditGallery editMode={props.editDialogOpen} /> 
                </Grid> }            
                <Grid item xs={props.editDialogOpen?12:12} sm={6} md={4} lg={props.editDialogOpen?3:3} >                   
                    <Typography component="div" variant="overline" color="primary"> Transaction </Typography>
                    <SelectField value={listingContext.listing.transaction} handleChange = {handleChange} name="transaction" classes= {classes.formControl} label="Transaction Type" options={SelectFieldOptions.transaction} error={errors.transaction} required={true}/> <br/>
                    {listingContext.listing.transaction ==="Rent" && <><SelectField value={listingContext.listing.rent_period} handleChange = {handleChange} name="rent_period"  classes= {classes.formControl} label="Rent Period" options={SelectFieldOptions.rent_period} error={errors.rent_period} required={true}/> <br/> </>}
                    <SelectField value={listingContext.listing.currency} handleChange = {handleChange} name="currency" classes= {classes.formControl} label="Currency" options={SelectFieldOptions.currency} error={errors.currency} required={true}/> <br/>
                    <TextField variant="outlined" value={listingContext.listing.price} onChange = {handleChange} name="price" className={classes.formControl} label="Price" type="number" error={errors.price ? true : false} helperText={errors.price} required/> <br/>

                    <Typography component="div" variant="overline" color="primary" style={{marginTop: 15}}> Address </Typography>
                    <TextField id="address" variant="outlined" value={listingContext.listing.street_building} onChange = {handleChange} name="street_building" className={classes.formControl} label="Street & Building" type="text" error={errors.street_building ? true : false} helperText={errors.street_building} required/> <br/>
                    <SelectField id="district" value={listingContext.listing.district} handleChange = {handleChange} name="district" classes= {classes.formControl} label="District" options={SelectFieldOptions.district} error={errors.district} required={true}/> <br/>                 
                </Grid>

                <Grid item xs={props.editDialogOpen?12:12} sm={6} md={4} lg={props.editDialogOpen?3:3} > 
                    <Typography component="div" variant="overline" color="primary"> General </Typography>
                    <SelectField value={listingContext.listing.home_type} handleChange = {handleChange} name="home_type" classes= {classes.formControl} label="Home Type" options={SelectFieldOptions.home_type} error={errors.home_type} required={true}/> <br/>
                    <TextField variant="outlined" InputProps={{ inputProps: { min: 0,} }} value={listingContext.listing.year_built} onChange = {handleChange} name="year_built" className={classes.formControl} label="Year built" type="number" error={errors.year_built ? true : false} helperText={errors.year_built} required/> <br/> 
                    <TextField variant="outlined" InputProps={{ inputProps: { min: 0,} }} value={listingContext.listing.area} onChange = {handleChange} name="area" className={classes.formControl} label="Area (㎡)" type="number" error={errors.area ? true : false}  helperText={errors.area} required/> <br/>
                    {(listingContext.listing.home_type === "House" || listingContext.listing.home_type === "Townhome") && <> <TextField variant="outlined" InputProps={{ inputProps: { min: 0,} }} value={listingContext.listing.lot_size} onChange = {handleChange} name="lot_size" className={classes.formControl} label="Lot Size (㎡)" type="number"error={errors.lot_size ? true : false} helperText={errors.lot_size}/> <br/> </>}      
                    {(listingContext.listing.home_type === "Apartment" ) && <> <TextField InputProps={{ inputProps: { min: 0,} }} variant="outlined" value={listingContext.listing.floor} onChange = {handleChange} name="floor" className={classes.formControl} label="Floor" type="number" error={errors.floor ? true : false} helperText={errors.floor} required/> <br/></> }
                    <TextField variant="outlined" InputProps={{ inputProps: { min: 0,} }} value={listingContext.listing.number_of_floors} onChange = {handleChange} name="number_of_floors" className={classes.formControl} label="Number of floors" type="number" error={errors.number_of_floors ? true : false} helperText={errors.number_of_floors} required/> <br/>
                    <TextField variant="outlined" InputProps={{ inputProps: { min: 0,} }} value={listingContext.listing.number_of_rooms} onChange = {handleChange} name="number_of_rooms" className={classes.formControl} label="Number of rooms" type="number" error={errors.number_of_rooms ? true : false} helperText={errors.number_of_rooms} required/> <br/>
                    <SelectField value={listingContext.listing.furnishing} handleChange = {handleChange} name="furnishing" classes= {classes.formControl} label="Furnishing" options={SelectFieldOptions.furnishing} error={errors.furnishing} required={true}/> <br/>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3} >
                    <Typography component="div" variant="overline" color="primary"> Amenities </Typography>
                    <FormControl className={classes.marginControl}>
                        <FormLabel>Please  select all amenities that apply</FormLabel>
                            <Amenities handleChange={handleChange} />
                        </FormControl> 
                </Grid>
                <Grid item xs={12} sm={6} md={12} lg={props.editDialogOpen?3:3} >
                    <Typography component="div" variant="overline" color="primary">Description</Typography>
                    <TextField value={listingContext.listing.description} onChange = {handleChange} className={classes.marginControl} name="description" label="Please Add Description" multiline rows={matchesLg || matchesSm ? 20 : 8} rowsMax={20} fullWidth variant="outlined"/> <br/>
                </Grid> 
                <Grid item xs={12} sm={12} md={12} lg={12} >  
                    <ImageUpload handleChange={handleChange} setErrors={setErrors}/>
                    <ListingImageEditGallery images={selectedImages} setSelectedImages={setSelectedImages} setPostImages={setPostImages}/> 
                </Grid>                              
            </Grid> 
            <Grid item display="flex" align="right">
            <Divider style={{marginTop: 10, marginBottom: 10}}></Divider>
            { (submitting || postedSuccessfully) && <Message submitting={submitting} editMode={props.editDialogOpen}/>}
            
            <Button variant="contained" color="primary" onClick={ handleSubmit } > {props.editDialogOpen ? "Edit Listing" : "Submit Listing" }</Button>    
            </Grid>
        </Paper>           
    )
}

export default ListingForm
