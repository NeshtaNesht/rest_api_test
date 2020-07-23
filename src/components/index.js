import React, { useEffect, useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import { setTitle } from "./Home/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Card from "./Card";
import NotFound from "./NotFound";

const App = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const notification = useSelector((state) => state.homeReducer.notification);

  const handlerChangeTitle = useCallback((title) => {
    dispatch(setTitle(title));
  });

  const handleSnackBar = () => () => {
    enqueueSnackbar(notification.message, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
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
          handlerChangeTitle("Главная страница");
          return <Home />;
        }}
      />
      <Route
        path="/card"
        render={() => {
          handlerChangeTitle("Карточка объекта");
          return <Card />;
        }}
      />
      <Route
        path="*"
        render={() => {
          handlerChangeTitle("404 :(");
          return <NotFound />;
        }}
      />
    </Switch>
  );
};

export default App;
