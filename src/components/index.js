// Тут роутинг
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import { setTitle } from "./Home/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

const App = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const notification = useSelector((state) => state.homeReducer.notification);

  const handleSnackBar = () => () => {
    enqueueSnackbar(notification.message, {
      variant: notification.type,
    });
  };

  useEffect(() => {
    if (notification.visibility) handleSnackBar()();
  }, [notification]);

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          dispatch(setTitle("Главная страница"));
          return <Home />;
        }}
      />
    </Switch>
  );
};

export default App;
