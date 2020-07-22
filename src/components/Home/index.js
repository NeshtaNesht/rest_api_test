import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  setNotification,
  setToken,
  setFetch,
  fetchGetPosts,
  fetchGetUsers,
} from "./actions";
import Lists from "../../ui/Lists";

const Home = () => {
  const token = useSelector((state) => state.homeReducer.token);
  const users = useSelector((state) => state.homeReducer.users);
  const posts = useSelector((state) => state.homeReducer.posts);
  const fetch = useSelector((state) => state.homeReducer.fetch);
  const dispatch = useDispatch();
  const [tableVis, setTableVis] = useState("users");

  const getData = () => {
    getPosts();
    getUsers();
  };

  const getPosts = (p = 0) => {
    dispatch(fetchGetPosts(p));
  };
  const getUsers = (p = 0) => {
    dispatch(fetchGetUsers(p));
  };

  const controls = (
    <div>
      {users && (
        <Button onClick={() => setTableVis("users")}>Пользователи</Button>
      )}
      {posts && <Button onClick={() => setTableVis("posts")}>Посты</Button>}
    </div>
  );

  // Наименования заголовков для Users и ключи доступа к данным
  const tableUsers = {
    headersName: ["Фамилия", "Имя", "Email"],
    keyValue: ["last_name", "first_name", "email"],
  };

  const tablePosts = {
    headersName: ["ID", "Наименование"],
    keyValue: ["id", "title"],
  };
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
        onClick={getData}
        disabled={!token}
      >
        Применить
      </Button>
      <Toolbar />
      {/* Есть запрос ? Показываем циркулярку */}
      {fetch && (
        <CircularProgress
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {controls}

      {users && (
        <Lists
          data={tableVis == "users" ? users : posts}
          table={tableVis == "users" ? tableUsers : tablePosts}
          onChangePage={(e, p) =>
            tableVis === "users" ? getUsers(p) : getPosts(p)
          }
        />
      )}
    </div>
  );
};

export default Home;
