import React from "react";
import { TextField, Button, List, Toolbar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { setNotification, setToken, setFetch, getData } from "./actions";

const Home = () => {
  const token = useSelector((state) => state.homeReducer.token);
  const users = useSelector((state) => state.homeReducer.users);
  const posts = useSelector((state) => state.homeReducer.posts);
  const fetch = useSelector((state) => state.homeReducer.fetch);
  const dispatch = useDispatch();
  const controls = (
    <div>
      {users && <Button>Пользователи</Button>}
      {posts && <Button>Посты</Button>}
    </div>
  );
  return (
    <div style={{ textAlign: "center" }}>
      <TextField
        label="Введите Access Token"
        variant="outlined"
        value={token}
        onChange={(e) => dispatch(setToken(e.target.value))}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(getData())}
      >
        Применить
      </Button>
      <Toolbar />
      {!fetch & !users && !posts ? null : fetch ? "loading" : controls}

      <List></List>
    </div>
  );
};

export default Home;
