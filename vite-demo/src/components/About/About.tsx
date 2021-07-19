import * as React from "react";
import { FC } from "react";
// import classes from "./About.module.css";
import classes from "./About.module.scss";

export const About: FC = () => {
  return (
    <>
      <h1>About</h1>
      {/* <p className={classes.red}>red</p> */}
      <p className={classes.green}>green</p>
    </>
  );
};
