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
  getPostsByUser,
  setActiveTab,
} from "./actions";
import Lists from "../../ui/Lists";
import { setCard } from "../Card/actions";

const Home = () => {
  const token = useSelector((state) => state.homeReducer.token);
  const users = useSelector((state) => state.homeReducer.users);
  const posts = useSelector((state) => state.homeReducer.posts);
  const fetch = useSelector((state) => state.homeReducer.fetch);
  const activeTab = useSelector((state) => state.homeReducer.activeTab);
  const dispatch = useDispatch();

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
        <Button onClick={() => dispatch(setActiveTab("users"))}>
          Пользователи
        </Button>
      )}
      {posts && (
        <Button onClick={() => dispatch(setActiveTab("posts"))}>Посты</Button>
      )}
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

      {activeTab && (
        <Lists
          data={activeTab == "users" ? users : posts}
          table={activeTab == "users" ? tableUsers : tablePosts}
          onChangePage={(e, p) =>
            activeTab === "users" ? getUsers(p) : getPosts(p)
          }
          onClickRow={(e, data) => {
            dispatch(setCard(data));
          }}
          isRedirect={true}
          toRedirect="/card"
        />
      )}
    </div>
  );
};

export default Home;
