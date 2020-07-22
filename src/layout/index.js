import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Appbar from "@material-ui/core/AppBar";
import {
  makeStyles,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
  Snackbar,
} from "@material-ui/core";
import { SnackbarProvider } from "notistack";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {},
  },
  paper: {
    color: theme.palette.text.secondary,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const appTitle = useSelector((state) => state.homeReducer.appTitle);

  return (
    <SnackbarProvider maxSnack={3}>
      <Appbar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Тестовое задание с Rest API - {appTitle}
          </Typography>
        </Toolbar>
      </Appbar>
      <Toolbar />
      <Container>
        <Box my={2}>{children}</Box>
      </Container>
    </SnackbarProvider>
  );
};

export default Layout;
