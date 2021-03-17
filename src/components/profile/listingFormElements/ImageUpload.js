import React from 'react'
import {Button} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

function ImageUpload(props) {

    return (
        <div style={{ marginTop: '5px'}}>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                multiple
                type="file"
                id="button-file"
                onChange={props.handleChange}
            />
            <label htmlFor="button-file">
                <Button variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />} >
                    Add images
                </Button>
            </label> <br/>
        </div>
    )
}

export default ImageUpload
