import React from "react";
import { Paper, Grid, Typography, Dialog, DialogActions, DialogContent, IconButton, makeStyles } from "@material-ui/core/";
import { Close } from "@material-ui/icons/";
import ListingBody from "../../base/ListingBody";

const styles = makeStyles((theme) => ({
    paper: {
        margin: 0,
        padding: 15,
        paddingBottom: 3,
        paddingRight: 25,
        backgroundColor: " ",
        "&:hover": {
          boxShadow: "0 9px 12px 1px rgba(0,0,0,0.14), 0 3px 16px 2px rgba(0,0,0,0.12), 0 5px 6px -3px rgba(0,0,0,0.20)"
        },
    },
    gridContainer: {
        margin: 0,
        padding: 0,
    },
}));

function ListingDialog(props) {
    const classes = styles();

    return (
        <Dialog
            open={props.open}
            onClose={() => props.handleClose(false)}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogActions style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="overline" color="primary" style={{ marginLeft: 15, flex: 1, fontWeight: "bold" }}>
                    {props.listing.number_of_rooms}-room {props.listing.home_type} for {props.listing.transaction}
                </Typography>
                <IconButton onClick={() => props.handleClose(false)} color="primary">
                    <Close />
                </IconButton>
            </DialogActions>

            <DialogContent dividers style={{ padding: 10 }}>
                <Paper className={classes.paper} elevation={2}>
                    <Grid container spacing={1} className={classes.gridContainer}>
                        <ListingBody listing={props.listing}/>
                    </Grid>
                </Paper>
            </DialogContent>
        </Dialog>
    );
}

export default ListingDialog;
