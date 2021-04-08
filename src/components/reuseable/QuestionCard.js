import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid,Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  singleRow: {
    margin: "10px",
  },
}));

export const QuestionCard = (props) => {
  let { question } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.singleRow}>
      <Grid item md={4} xs={12}>
        <Typography variant="body1">{question.owner.display_name}</Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <Typography variant="body1">{question.title}</Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <Typography variant="body1">
          {new Date(question.creation_date).getDate()}/
          {new Date(question.creation_date).getMonth() + 1}/
          {new Date(question.creation_date).getFullYear()}
        </Typography>
      </Grid>
    </Grid>
  );
};
