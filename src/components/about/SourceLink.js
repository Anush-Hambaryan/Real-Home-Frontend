import React from "react";
import { Link, ListItem } from "@material-ui/core";

function SourceLink(props) {
  return (
    <ListItem>
      <Link href={props.link}>{props.link}</Link>
    </ListItem>
  );
}

export default SourceLink;
