import React, { useState, useEffect } from "react";
import { Snackbar, makeStyles, CircularProgress } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

function Message(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [])

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar 
        style={{ bottom: props.editMode && 70 }}
        open={open} 
        autoHideDuration={!props.submitting ? 6000 : null} 
        onClose={handleClose}
      >
        {props.submitting 
        ? <CircularProgress /> 
        : <Alert onClose={handleClose} severity="success">
            Listing posted successfully!
          </Alert>
        }
      </Snackbar>
    </div>
  );
}

export default Message;