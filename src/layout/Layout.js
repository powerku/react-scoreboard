import classes from "./Layout.module.css";
import React from "react";

function Layout(props) {
  return (
    <React.Fragment>
      <main className={classes.main}>{props.children}</main>
    </React.Fragment>
  );
}

export default Layout;
