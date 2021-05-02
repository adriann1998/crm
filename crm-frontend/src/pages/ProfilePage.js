import React from "react";
import clsx from "clsx";
import {
  Grid,
  Paper,
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
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          Chart
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          Depostis
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={styles.paper}>
          Orders
        </Paper>
      </Grid>
    </Grid>
  );
}
