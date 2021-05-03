import React from "react";
import clsx from "clsx";
import {
  Grid,
  Paper,
  Typography,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixhedHeight: {
    height: 240
  }
}));

export default function ProfilePage() {

  const styles = useStyles();
  const fixedHeightPaper = clsx(styles.paper, styles.fixedHeight);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Paper className={fixedHeightPaper}>
          <Typography variant="h6">Personal Information</Typography>
          
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Paper className={fixedHeightPaper}>
          Depostis
        </Paper>
      </Grid>
    </Grid>
  );
}
